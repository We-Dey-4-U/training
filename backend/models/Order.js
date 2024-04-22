// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }],
  totalPrice: {
    type: Number,
    required: true
  },
  shippingAddress: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  paymentMethod: {
    type: String, // Assuming paymentMethod is a string, modify it as needed
    required: true
  }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;