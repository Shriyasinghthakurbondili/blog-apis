const Payment = require("../models/paymentModel");
const Order = require("../models/orderModel");
const getRazorpayClient = require("../config/razorpay");

const createPaymentOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ message: "orderId is required" });
    }

    const order = await Order.findOne({ _id: orderId, user: req.user.id });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const razorpay = getRazorpayClient();
    if (!razorpay) {
      return res.status(500).json({
        message: "Razorpay is not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.",
      });
    }

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(order.totalAmount * 100),
      currency: "INR",
      receipt: `receipt_${order._id}`,
    });

    const payment = await Payment.findOneAndUpdate(
      { order: order._id },
      {
        order: order._id,
        user: req.user.id,
        razorpayOrderId: razorpayOrder.id,
        amount: order.totalAmount,
        currency: razorpayOrder.currency,
        status: "created",
      },
      { new: true, upsert: true }
    );

    return res.status(201).json({
      message: "Razorpay order created",
      razorpayOrder,
      payment,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error while creating payment order" });
  }
};

module.exports = { createPaymentOrder };
