const Payments = require("../models/Payment");

const createPaymentIntent = async (amount, currency, merchantId) => {
    try {
        const payment = await Payments.create({
            status: "pending",
            merchantId,
            currency,
            amount
        });
        return payment;
    } catch (error) {
        throw error;
    }
}

const getPaymentDetailsByPaymentId = async (paymentId) => {
    try {
        const payment = await Payments.findById(paymentId);
        return payment;
    } catch (error) {
        throw error;
    }
}

const confirmPayment = async (paymentId) => {
    try {
        const payment = await Payments.findOneAndUpdate({_id: paymentId}, {status: "completed"}, {new: true});
        return payment;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createPaymentIntent,
    getPaymentDetailsByPaymentId,
    confirmPayment
}