const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  batchNo: { type: String, unique: true },
  subjectCourse: { type: String },
  startingDate: { type: Date },
  endingDate: { type: Date },
  publishedStatus: { type: Boolean, default: true },
  status: { type: String, enum: ['upcoming', 'active', 'completed'], default: 'upcoming' },
}, { timestamps: true });

module.exports = mongoose.model('Batch', batchSchema); 