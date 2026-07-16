const mongoose = require("mongoose");

const idempotencySchema = new mongoose.Schema({
    merchantId: {
        type: mongoose.Types.ObjectId,
        ref: "Merchant"
    },
    paymentId: {
        type: mongoose.Types.ObjectId,
        ref: "Payments"
    },
    key: {
        type: String
    },
    status: {
        type: String,
        enum: ["processing", "completed"],
        default: "processing"
    },
    statusCode: {
        type: Number
    },
    responseBody: {
        type: mongoose.Schema.Types.Mixed
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400
    }
});

idempotencySchema.index(
    {
        merchantId: 1,
        paymentId: 1,
        key: 1
    },
    {
        unique: true
    }
);

const Idempotency = mongoose.model('Idempotency', idempotencySchema);

module.exports = Idempotency;
