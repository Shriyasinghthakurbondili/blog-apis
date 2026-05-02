const express = require("express");
const { createOrder, getUserOrders } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);
router.post("/", createOrder);
router.get("/", getUserOrders);

module.exports = router;
