const express = require('express');
const connectDB = require('./config/database');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors'); // Import the cors middleware



// Import routes
// Import routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes'); // New import
const inventoryRoutes = require('./routes/inventoryRoutes');
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');


// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Allow CORS for all origins
app.use(cors());


// Routes
// Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes); // New route
app.use('/api/inventory', inventoryRoutes);
app.use('/admin', adminRoutes); // Use admin routes
app.use('/api/products', productRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});