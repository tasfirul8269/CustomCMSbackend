const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const { uploadImage, uploadMiddleware } = require('../controllers/uploadController');

// Upload image (Admin and Moderator)
router.post('/image', auth, authorize(['admin', 'moderator']), uploadMiddleware, uploadImage);

module.exports = router; 