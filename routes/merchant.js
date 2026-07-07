const express = require("express");
const router = express.Router();
const {addMerchant, getMerchantDetails} = require("../controller/merchantController");

router.use("/add", addMerchant);
router.use("/:id", getMerchantDetails);

module.exports = router;