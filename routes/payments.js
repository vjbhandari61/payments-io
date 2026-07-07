const express = require("express");
const router = express.Router();
const {createPaymentIntent, confirmPayment, getPaymentDetails} = require("../controller/paymentsController");

router.use("/create-intent", createPaymentIntent);
router.use("/:id/confirm", confirmPayment);
router.use("/:id", getPaymentDetails);


module.exports = router;