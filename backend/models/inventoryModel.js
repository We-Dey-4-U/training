// inventoryModel.js
const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    // Remove the manual definition of _id
    name: String,
    description: String,
    quantity: Number,
    price: Number,
    total_price: Number,
    date: { type: Date, default: Date.now } // Add the date field with default value of current date and time
});



const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;