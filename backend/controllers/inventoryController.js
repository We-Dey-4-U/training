const Inventory = require('../models/inventoryModel'); // Import mongoose model

// Get all inventory items
exports.getAllInventory = (req, res) => {
    Inventory.find({})
      .then(inventory => {
        res.status(200).json(inventory);
      })
      .catch(err => {
        console.error('Error retrieving inventory:', err);
        res.status(500).json({ error: 'Error retrieving inventory' });
      });
  };

// Add new inventory item
exports.addInventoryItem = (req, res) => {
    const { name, description, quantity, price } = req.body;
    const total_price = quantity * price; // Calculate total price
    const newItem = new Inventory({ 
        name, 
        description, 
        quantity, 
        price,
        total_price,  
        date: Date.now() // Add the current date and time
    });
    newItem.save()
      .then(() => {
        res.status(201).json({ message: 'Inventory item added successfully' });
      })
      .catch(err => {
        console.error('Error adding inventory item:', err);
        res.status(500).json({ error: 'Error adding inventory item' });
      });
  };

// Update inventory item
exports.updateInventoryItem = (req, res) => {
  const { id } = req.params;
  const { name, description, quantity, price } = req.body;
  const total_price = quantity * price; // Recalculate total price
  Inventory.findByIdAndUpdate(id, { name, description, quantity, price, total_price }, (err) => {
    if (err) {
      res.status(500).json({ error: 'Error updating inventory item' });
    } else {
      res.status(200).json({ message: 'Inventory item updated successfully' });
    }
  });
};

// Delete inventory item
exports.deleteInventoryItem = (req, res) => {
    const { id } = req.params;
    Inventory.findByIdAndDelete(id)
      .then(deletedItem => {
        if (!deletedItem) {
          res.status(404).json({ error: 'Inventory item not found' });
        } else {
          res.status(200).json({ message: 'Inventory item deleted successfully' });
        }
      })
      .catch(err => {
        console.error('Error deleting inventory item:', err);
        res.status(500).json({ error: 'Error deleting inventory item' });
      });
  };