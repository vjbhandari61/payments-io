const Merchant = require("../models/Merchant");

const getMerchantById = async (merchantId) => {
    try {
        const merchant = await Merchant.findById(merchantId);
        return merchant;
    } catch (error) {
        throw error;
    }
};

const addNewMerchant = async (name) => {
    try {
        const merchant = await Merchant.create({
            name
        });
        return merchant;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getMerchantById,
    addNewMerchant
}