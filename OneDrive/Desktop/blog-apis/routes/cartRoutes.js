const express = require("express");
const { addToCart, removeFromCart, getUserCart } = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);
router.get("/", getUserCart);
router.post("/", addToCart);
router.delete("/:productId", removeFromCart);

module.exports = router;
