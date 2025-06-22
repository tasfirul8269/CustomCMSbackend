const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { auth, authorize } = require('../middleware/auth');

// Get all users (Admin only)
router.get('/users', auth, authorize('admin'), authController.getAllUsers);

// Register (Admin only)
router.post('/register', auth, authorize('admin'), authController.register);

// Update user (Admin only)
router.put('/users/:id', auth, authorize('admin'), authController.updateUser);

// Delete user (Admin only)
router.delete('/users/:id', auth, authorize('admin'), authController.deleteUser);

// Login
router.post('/login', authController.login);

module.exports = router; 