const mongoose = require("mongoose");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const Address = require("../models/addressModel");

const createOrder = async (req, res) => {
  try {
    const { items, addressId } = req.body;

    if (!Array.isArray(items) || items.length === 0 || !addressId) {
      return res.status(400).json({ message: "Items and addressId are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(addressId)) {
      return res.status(400).json({ message: "Invalid address id" });
    }

    const address = await Address.findOne({ _id: addressId, user: req.user.id });
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    let totalAmount = 0;
    const orderItems = [];

    // Validate product references and freeze per-item price at order time.
    for (const item of items) {
      if (!item.product || !mongoose.Types.ObjectId.isValid(item.product) || !item.quantity) {
        return res.status(400).json({ message: "Each item must include valid product and quantity" });
      }

      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.product}` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.title}` });
      }

      totalAmount += product.price * item.quantity;
      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });
      product.stock -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      shippingAddress: address._id,
      totalAmount,
    });

    const populatedOrder = await Order.findById(order._id)
      .populate("items.product", "title price image.url")
      .populate("shippingAddress");

    return res.status(201).json({ message: "Order created successfully", order: populatedOrder });
  } catch (error) {
    return res.status(500).json({ message: "Server error while creating order" });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("items.product", "title price image.url")
      .populate("shippingAddress")
      .sort({ createdAt: -1 });

    return res.status(200).json({ orders });
  } catch (error) {
    return res.status(500).json({ message: "Server error while fetching orders" });
  }
};

module.exports = { createOrder, getUserOrders };
