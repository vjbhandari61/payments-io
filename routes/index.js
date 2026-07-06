const express = require("express");
const router = express.Router();

const paymentRoutes = require("./payments");

router.get("/", (req, res) => {
    res.send("This is PaymentIO's Server");
});

router.use("/payment", paymentRoutes);

module.exports = router;