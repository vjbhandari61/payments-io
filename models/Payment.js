const mongoose = require("mongoose");

const paymentsSchema = new mongoose.Schema({
    merchantId: {
        type: mongoose.Types.ObjectId,
        ref: 'Merchant'
    },
    status: {
        type: String,
        enum: ["pending", "completed", "failed"]
    },
    currency: {
        type: String,
        enum: ["usd", "inr", "chy", "skw"]
    },
    amount: Number,
}, {
    timestamps: true
});

const Payments = mongoose.model('Payments', paymentsSchema);

module.exports = Payments;