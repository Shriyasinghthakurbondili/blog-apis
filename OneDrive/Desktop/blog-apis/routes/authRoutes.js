const express = require("express");
const { signup, login } = require("../controllers/authController");

const router = express.Router();

router.post("/register", signup);   // ✅ changed
router.post("/login", login);

module.exports = router;