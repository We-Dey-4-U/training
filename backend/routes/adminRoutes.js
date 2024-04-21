// adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticate } = require('../middleware/authMiddleware');

// Protected admin route
router.get('/adminStatus', authenticate, adminController.getAdminStatus);

module.exports = router;