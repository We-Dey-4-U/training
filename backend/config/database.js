// config/database.js
//ikenna:Tekere1983@cluster0.f63sfas.mongodb.net/dndtv?retryWrites=true&w=majority
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://test:test@cluster0.2h6vcur.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0', {
     
      
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;