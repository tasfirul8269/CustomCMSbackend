const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String },
  courseCode: { type: String, unique: true },
  assignmentDuration: { type: Number },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema); 