const cloudinary = require('../utils/cloudinary');
const multer = require('multer');

// Configure multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    // Convert buffer to base64
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'profile-images',
    });

    res.json({ url: result.secure_url });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Failed to upload image' });
  }
};

// Export multer middleware for use in routes
exports.uploadMiddleware = upload.single('image'); 