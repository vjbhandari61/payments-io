const mongoose = require("mongoose");

const idempotencySchema = new mongoose.Schema({
    merchantId: {
        type: mongoose.Types.ObjectId,
        ref: "Merchant"
    },
    key: {
        type: String
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
        key: 1
    },
    {
        unique: true
    }
);

const Idempotency = mongoose.model('Idempotency', idempotencySchema);

module.exports = Idempotency;