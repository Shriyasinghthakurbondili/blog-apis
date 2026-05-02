const mongoose = require("mongoose");
const Wishlist = require("../models/wishlistModel");
const Product = require("../models/productModel");

const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Valid productId is required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const wishlist =
      (await Wishlist.findOne({ user: req.user.id })) || new Wishlist({ user: req.user.id, products: [] });

    if (!wishlist.products.some((id) => id.toString() === productId)) {
      wishlist.products.push(productId);
      await wishlist.save();
    }

    const populatedWishlist = await wishlist.populate("products", "title price image.url");
    return res.status(200).json({ message: "Wishlist updated", wishlist: populatedWishlist });
  } catch (error) {
    return res.status(500).json({ message: "Server error while updating wishlist" });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    const wishlist = await Wishlist.findOne({ user: req.user.id });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.products = wishlist.products.filter((id) => id.toString() !== productId);
    await wishlist.save();

    const populatedWishlist = await wishlist.populate("products", "title price image.url");
    return res.status(200).json({ message: "Product removed from wishlist", wishlist: populatedWishlist });
  } catch (error) {
    return res.status(500).json({ message: "Server error while removing from wishlist" });
  }
};

const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id }).populate(
      "products",
      "title description price image.url stock"
    );

    return res.status(200).json({ wishlist: wishlist || { user: req.user.id, products: [] } });
  } catch (error) {
    return res.status(500).json({ message: "Server error while fetching wishlist" });
  }
};

module.exports = { addToWishlist, removeFromWishlist, getWishlist };
