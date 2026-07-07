const paymentsService = require("../services/paymentsService");
const merchantService = require("../services/merchantService");

const createPaymentIntent = async (req, res) => {
    const { amount, currency, merchantId } = req.body;

    try {
        if (!amount || !currency || !merchantId) {
            return res.status(400).json({
                success: false,
                error: "Missing required fields"
            })
        };

        const merchant = await merchantService.getMerchantById(merchantId);

        if (!merchant) {
            return res.status(404).json({
                success: false,
                error: "Invalid Merchant ID"
            })

        }

        const intent = await paymentsService.createPaymentIntent(
            amount,
            currency,
            merchant._id
        );

        return res.status(201).json({
            success: true,
            data: intent
        });

    } catch (error) {
        console.error("PaymentController.createPaymentIntent: ", error);

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const confirmPayment = async (req, res) => {
    const paymentId = req.params.id;
    try {
        if (!paymentId) {
            return res.status(404).json({
                success: false,
                error: "Payment Id is required"
            })
        }

        const payment = await paymentsService.getPaymentDetailsByPaymentId(paymentId);
        
        if (!payment) {
            return res.status(404).json({
                success: false,
                error: "Payment not found"
            });
        }

        if (payment.status == "completed") {
            return res.status(409).json({
                success: false,
                error: "Payment has already been completed"
            });
        }

        const confirmedPayment = await paymentsService.confirmPayment(payment._id);
        
        return res.status(200).json({
            success: true,
            data: confirmedPayment
        });

    } catch (error) {
        console.error("PaymentController.confirmPayment: ", error);

        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

const getPaymentDetails = async (req, res) => {
    const paymentId = req.params.id;
    try {
        if (!paymentId) {
            return res.status(404).json({
                success: false,
                error: "Payment Id is required"
            })
        }

        const payment = await paymentsService.getPaymentDetailsByPaymentId(paymentId);
        return res.status(200).json({
            success: true,
            data: payment
        })
    } catch (error) {
        console.error("PaymentController.getPaymentDetails: ", error);

        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

module.exports = {
    createPaymentIntent,
    confirmPayment,
    getPaymentDetails
};