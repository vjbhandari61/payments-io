const Payment = require("../models/Payment");
const Idempotency = require("../models/Idempotency");

async function idempotent(req, res, next) {
    const key = req.headers["idempotency-key"];

    if (!key) {
        return res.status(400).json({
            error: "Missing Idempotency-Key"
        });
    }

    const existing = await Idempotency.findOne({
        merchantId: req.body.merchantId,
        key
    });

    if (existing) {
        const existingPayment = await Payment.findOne({merchantId});
        return existingPayment;
    }

    next();
}

module.exports = {idempotent};