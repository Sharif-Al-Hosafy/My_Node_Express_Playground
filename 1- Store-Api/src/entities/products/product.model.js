const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a product name"],
  },
  price: {
    type: Number,
    required: [true, "Please add a product price"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
  },
  company: {
    type: String,
    enum: ["ikea", "marcos", "liddy", "caressa"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);
