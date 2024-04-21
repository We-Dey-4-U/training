const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, '../uploads/');
        // Check if the uploads directory exists, if not, create it
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true }); // Create directory recursively
        }
        cb(null, uploadDir); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + '-' + file.originalname); // Use a unique filename
    }
});

// Set up multer upload configuration
const upload = multer({ 
    storage: storage,
    // File filter to restrict file types
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true); // Accept the file
        } else {
            cb(new Error('Only image files are allowed.'), false); // Reject the file
        }
    }
});

// Route for creating a product with file upload
router.post('/', upload.single('image'), productController.createProduct);
// Define routes for CRUD operations on products
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;