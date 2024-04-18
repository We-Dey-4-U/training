const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Inventory routes
router.get('/', inventoryController.getAllInventory);
router.post('/', inventoryController.addInventoryItem);
router.put('/:id', inventoryController.updateInventoryItem);
router.delete('/:id', inventoryController.deleteInventoryItem);

module.exports = router;