const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  locationName: { type: String, required: true },
  name: { type: String }, // Keep for backward compatibility
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  publishStatus: { type: String, enum: ['published', 'draft'], default: 'draft' },
}, { timestamps: true });

module.exports = mongoose.model('Location', locationSchema); 