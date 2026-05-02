const express = require("express");

const {
  getAllProducts,
  getSingleProduct,
  addNewProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const upload = require("../middleware/imageMiddleware");

const router = express.Router();

// GET
router.get("/products", getAllProducts);
router.get("/products/:id", getSingleProduct);

// 🔥 IMPORTANT (multer only)
router.post("/products", upload.single("image"), addNewProduct);

router.put("/products/:id", upload.single("image"), updateProduct);
router.delete("/products/:id", deleteProduct);

module.exports = router;