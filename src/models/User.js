const mongoose = require('mongoose');

const moderatorPermissions = [
  'students',
  'courses',
  'batches',
  'certifications',
  'employees',
  'vendors',
  'locations',
  'reports',
];

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String }, // Cloudinary URL
  role: { type: String, enum: ['admin', 'moderator'], required: true },
  permissions: [{ type: String, enum: moderatorPermissions }], // Only for moderators
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema); 