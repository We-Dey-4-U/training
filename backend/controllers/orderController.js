// controllers/orderController.js
const Order = require('../models/Order');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  try {
    const { products, totalPrice, shippingAddress, paymentMethod} = req.body;

    // Ensure that products is an array of objects
    if (!Array.isArray(products) || !products.every(item => typeof item === 'object')) {
      return res.status(400).json({ error: 'Invalid products array format' });
    }

    // Validate each product object in the array
    const isValidProduct = products.every(item =>
      item.productId && typeof item.productId === 'string' &&
      item.quantity && typeof item.quantity === 'number'
    );

    if (!isValidProduct) {
      return res.status(400).json({ error: 'Invalid product object format' });
    }

    const order = await Order.create({ products, totalPrice, shippingAddress, paymentMethod });
    res.status(201).json({ message: 'Order created successfully', orderId: order._id, order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json({ order });
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const updates = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(orderId, updates, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
};

exports.processOrder = async (req, res) => {
    try {
      const { cart, totalPrice, shippingAddress , paymentMethod} = req.body;
  
      // Validate request payload
      if (!Array.isArray(cart) || typeof totalPrice !== 'number' || typeof shippingAddress !== 'object') {
        return res.status(400).json({ error: 'Invalid request payload' });
      }
  
      // Extract product IDs from the cart items
      const productIds = cart.map(item => item.productId);
  
      // Fetch detailed product information based on product IDs in the cart
      const products = [];
      for (const productId of productIds) {
        const product = await Product.findById(productId);
        if (!product) {
          return res.status(400).json({ error: `Product with ID ${productId} not found` });
        }
        products.push({
          product: product._id,
          name: product.name,
          price: product.price,
          quantity: cart.find(item => item.productId === productId).quantity,
          image: product.image // Assuming you have an image field in your product schema
        });
      }
  
      // Create a new order with detailed product information
      const order = new Order({
        products,
        totalPrice,
        shippingAddress,
        paymentMethod, // Include paymentMethod field
        // Add additional fields if needed
      });
  
      // Save the order to the database
      await order.save();
  
      // Respond with the order ID
      res.status(201).json({ message: 'Order processed successfully', orderId: order._id });
    } catch (error) {
      console.error('Error processing order:', error);
      res.status(500).json({ message: 'Error processing order' });
    }
  };