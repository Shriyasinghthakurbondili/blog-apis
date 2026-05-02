const Product = require("../models/productModel");

// 🔥 CREATE PRODUCT
exports.addNewProduct = async (req, res) => {
  try {
    const { title, description, price, stock, category } = req.body;

    if (!title || !description || !price || !stock) {
      return res.status(400).json({
        message: "Title, description, price and stock are required",
      });
    }

    const product = await Product.create({
      title,
      description,
      price,
      stock,
      category,
      image: req.file
        ? {
            url: req.file.path,
            publicId: req.file.filename,
          }
        : {},
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔥 GET ALL PRODUCTS (WITH PAGINATION)
exports.getAllProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;   // default page = 1
    const limit = Number(req.query.limit) || 5; // default limit = 5

    const skip = (page - 1) * limit;

    const total = await Product.countDocuments();

    const products = await Product.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      totalProducts: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔥 GET SINGLE PRODUCT
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔥 UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (req.file) {
      product.image = {
        url: req.file.path,
        publicId: req.file.filename,
      };
    }

    product.title = req.body.title || product.title;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.stock = req.body.stock || product.stock;
    product.category = req.body.category || product.category;

    await product.save();

    res.json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔥 DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};