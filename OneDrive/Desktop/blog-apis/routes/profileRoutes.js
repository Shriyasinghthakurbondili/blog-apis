const express = require("express");
const { getProfile, updateProfile } = require("../controllers/profileController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/imageMiddleware");

const router = express.Router();

router.use(protect);
router.get("/", getProfile);
router.put("/", upload.single("avatar"), updateProfile);

module.exports = router;
