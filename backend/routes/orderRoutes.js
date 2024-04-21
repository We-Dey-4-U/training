// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.createOrder);
router.get('/', orderController.getAllOrders); // Route to retrieve all orders
router.get('/:orderId', orderController.getOrderById);
router.put('/:orderId', orderController.updateOrder); // Route to update an order by ID
router.post('/process-order', orderController.processOrder);

module.exports = router;