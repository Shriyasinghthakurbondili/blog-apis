const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    default: "general"
  },
  image: {
    url: String,
    publicId: String
  }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);