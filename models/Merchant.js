const mongoose = require("mongoose");

const merchantSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

const Merchant = mongoose.model('Merchant', merchantSchema);

module.exports = Merchant;