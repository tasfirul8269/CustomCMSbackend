const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  batchNo: { type: String, required: true, unique: true },
  subjectCourse: { type: String, required: true },
  startingDate: { type: Date, required: true },
  endingDate: { type: Date, required: true },
  publishedStatus: { type: Boolean, default: true },
  status: { type: String, enum: ['upcoming', 'active', 'completed'], default: 'upcoming' },
}, { timestamps: true });

module.exports = mongoose.model('Batch', batchSchema); 