const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
};

exports.getProductById = async (req, res) => {
    try {
      const productId = req.params.id; // Assuming the ID is provided in the request parameters
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      res.status(500).json({ message: 'Error fetching product' });
    }
  };

  exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, quantity } = req.body; // Destructure the required fields from the request body

        // Check if product image exists in the request
        if (!req.file) {
            return res.status(400).json({ error: 'Product image is required' });
        }

        const image = req.file.filename; // Use only the filename for image path
        const product = await Product.create({ name, description, price, quantity, image }); // Create the product using the provided data
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        console.error('Error creating product:', error);
        
        // Check if the error is related to file not found or access denied
        if (error.code === 'ENOENT') {
            return res.status(404).json({ error: 'File not found or access denied' });
        }
        
        res.status(500).json({ error: 'Failed to create product' });
    }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product updated successfully', updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully', deletedProduct });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product' });
  }
};




// cartController.js

const mongoose = require('mongoose');

exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        // Validate the productId
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }

        // Find the product by ID
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Add the product to the cart
        // You can store cart data in the user's session, database, or elsewhere
        // For this example, let's assume we're storing cart data in the session
        req.session.cart = req.session.cart || [];
        req.session.cart.push({ productId, quantity });

        // Respond with a success message or updated cart data
        res.status(200).json({ message: 'Product added to cart successfully9' });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ message: 'Error adding product to cart' });
    }
};




