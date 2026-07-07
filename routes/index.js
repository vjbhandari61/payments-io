const express = require("express");
const router = express.Router();

const paymentRoutes = require("./payments");
const merchantRoutes = require("./merchant");

router.get("/", (req, res) => {
    res.send("This is PaymentIO's Server");
});

router.use("/payment", paymentRoutes);
router.use("/merchant", merchantRoutes);

module.exports = router;