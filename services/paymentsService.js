const Payments = require("../models/Payment");

const getMerchantById = async (merchantId) => {
    try {
        const merchant = await Payments.findOneById(merchantId);
        return merchant;
    } catch (error) {
        throw error;
    }
};

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
        const payment = await Payments.findOneById(paymentId);
        return payment;
    } catch (error) {
        throw error;
    }
}

const confirmPayment = async (paymentId) => {
    try {
        const payment = await Payments.updateOne({_id: paymentId}, {status: "completed"});
        return payment;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getMerchantById,
    createPaymentIntent,
    getPaymentDetailsByPaymentId,
    confirmPayment
}