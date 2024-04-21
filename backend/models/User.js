const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false } // Add isAdmin field
});

const User = mongoose.model('User', userSchema);

module.exports = User;