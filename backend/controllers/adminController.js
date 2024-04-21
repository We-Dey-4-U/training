// Admin Controller (controllers/adminController.js):

// Import any necessary modules

// adminController.js
exports.getAdminStatus = (req, res) => {
    // Check if the user is an admin
    if (req.user && req.user.isAdmin) {
        res.status(200).json({ isAdmin: true });
    } else {
        res.status(403).json({ isAdmin: false });
    }
};