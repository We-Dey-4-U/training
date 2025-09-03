const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext); // Use a unique filename
    }
});

const upload = multer({ 
    storage: storage,
    // File filter to accept various image formats
    fileFilter: function (req, file, cb) {
        // List of accepted MIME types for image files
        const acceptedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp']; // Add more MIME types as needed

        // Check if the uploaded file's MIME type is in the accepted list
        if (acceptedMimeTypes.includes(file.mimetype)) {
            cb(null, true); // Accept the file
        } else {
            cb(new Error('Only JPEG, PNG, GIF, and BMP image files are allowed.'), false); // Reject the file
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
router.post('/add-to-cart', productController.addToCart);
//router.get('/featured-product', productController.getFeaturedProduct);

module.exports = router;