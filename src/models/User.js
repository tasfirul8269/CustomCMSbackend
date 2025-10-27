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
  email: { type: String },
  password: { type: String },
  profileImage: { type: String }, // Cloudinary URL
  role: { type: String, enum: ['admin', 'moderator'] },
  permissions: [{
    resource: { type: String },
    access: { type: String, enum: ['read', 'write'] }
  }], // Only for moderators - array of objects with resource and access level
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema); 