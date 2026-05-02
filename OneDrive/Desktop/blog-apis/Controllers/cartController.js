const mongoose = require("mongoose");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Valid productId is required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cart = (await Cart.findOne({ user: req.user.id })) || new Cart({ user: req.user.id, items: [] });
    const existingItem = cart.items.find((item) => item.product.toString() === productId);

    if (existingItem) {
      existingItem.quantity += Number(quantity);
    } else {
      cart.items.push({ product: productId, quantity: Number(quantity) });
    }

    await cart.save();
    const populatedCart = await cart.populate("items.product", "title price image.url stock");
    return res.status(200).json({ message: "Cart updated", cart: populatedCart });
  } catch (error) {
    return res.status(500).json({ message: "Server error while updating cart" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    await cart.save();

    const populatedCart = await cart.populate("items.product", "title price image.url stock");
    return res.status(200).json({ message: "Item removed from cart", cart: populatedCart });
  } catch (error) {
    return res.status(500).json({ message: "Server error while removing from cart" });
  }
};

const getUserCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product",
      "title description price image.url stock"
    );

    return res.status(200).json({ cart: cart || { user: req.user.id, items: [] } });
  } catch (error) {
    return res.status(500).json({ message: "Server error while fetching cart" });
  }
};

module.exports = { addToCart, removeFromCart, getUserCart };
