const express = require("express");
const router = express.Router();
const {createPaymentIntent, confirmPayment} = require("../controller/paymentsController");

router.use("/create-intent", createPaymentIntent);
router.use("/:id/confirm", confirmPayment);

module.exports = router;