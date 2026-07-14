const express = require("express");
const router = express.Router();
const {createPaymentIntent, confirmPayment, getPaymentDetails} = require("../controller/paymentsController");
const {idempotent} = require("../middleware/idempotency");

router.use("/create-intent", createPaymentIntent);
router.use("/:id/confirm", idempotent, confirmPayment);
router.use("/:id", getPaymentDetails);


module.exports = router;