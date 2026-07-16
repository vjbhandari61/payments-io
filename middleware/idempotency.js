const Payment = require("../models/Payment");
const Idempotency = require("../models/Idempotency");

async function idempotent(req, res, next) {
    try {
        const key = req.headers["idempotency-key"];

        if (!key) {
            return res.status(400).json({
                error: "Missing Idempotency-Key"
            });
        }

        const paymentId = req.params.id;
        const payment = await Payment.findById(paymentId);

        if (!payment) {
            return next();
        }

        const lookup = {
            merchantId: payment.merchantId,
            paymentId: payment._id,
            key
        };

        const existing = await Idempotency.findOne(lookup);

        if (existing) {
            if (existing.status === "processing") {
                return res.status(409).json({
                    success: false,
                    error: "This request is already being processed"
                });
            }

            return res.status(existing.statusCode || 200).json(existing.responseBody);
        }

        const record = await Idempotency.create(lookup);
        req.idempotencyRecord = record;
        req.payment = payment;

        const originalJson = res.json.bind(res);
        const originalSend = res.send.bind(res);
        let responseBody;

        const snapshot = (body) => {
            if (body === undefined) {
                return undefined;
            }

            if (typeof body === "string" || Buffer.isBuffer(body)) {
                return body;
            }

            return JSON.parse(JSON.stringify(body));
        };

        res.json = (body) => {
            responseBody = snapshot(body);
            return originalJson(body);
        };

        res.send = (body) => {
            responseBody = snapshot(body);
            return originalSend(body);
        };

        res.once("finish", async () => {
            if (!req.idempotencyRecord) {
                return;
            }

            try {
                await Idempotency.findByIdAndUpdate(req.idempotencyRecord._id, {
                    status: "completed",
                    statusCode: res.statusCode,
                    responseBody
                });
            } catch (error) {
                console.error("Idempotency record update failed:", error);
            }
        });

        next();
    } catch (error) {
        console.error("Idempotency middleware failed:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to process idempotency"
        });
    }
}

module.exports = {idempotent};
