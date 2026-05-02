const express = require("express");
const { addAddress, getAllAddresses, deleteAddress } = require("../controllers/addressController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);
router.post("/", addAddress);
router.get("/", getAllAddresses);
router.delete("/:id", deleteAddress);

module.exports = router;
