const express = require("express");
const { createPaymentOrder } = require("../controllers/paymentController");
const { verifyPayment } = require("../controllers/verifyPaymentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);
router.post("/create-order", createPaymentOrder);
router.post("/verify", verifyPayment);

module.exports = router;
