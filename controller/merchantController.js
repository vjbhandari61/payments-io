const merchantService = require("../services/merchantService");

const addMerchant = async (req, res) => {
    const { name } = req.body;
    try {
        if (!name) {
            return res.status(400).json({
                success: false,
                error: "Missing required fields"
            })
        };

        const merchant = await merchantService.addNewMerchant(name);

        return res.status(201).json({
            success: true,
            data: merchant
        });

    } catch (error) {
        console.error("MerchantController.addMerchant: ", error);

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const getMerchantDetails = async (req, res) => {
    const merchantId = req.params.id;
    try {
        if (!merchantId) {
            return res.status(400).json({
                success: false,
                error: "Missing required fields"
            })
        };

        const merchant = await merchantService.getMerchantById(name);

        if(!merchant) {
            return res.status(400).json({
                success: false,
                error: "Invalid Merchant ID"
            })
        }

        return res.status(201).json({
            success: true,
            data: merchant
        });
    } catch (error) {
        console.error("MerchantController.getMerchantDetails: ", error);

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

module.exports = {
    addMerchant,
    getMerchantDetails
}