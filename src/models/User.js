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
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  profileImage: { type: String }, // Cloudinary URL
  role: { type: String, enum: ['admin', 'moderator'] },
  permissions: [{ type: String }], // Only for moderators
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema); 