const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  issueDate: { type: Date, required: true },
  certificateNumber: { type: String, required: true, unique: true },
  status: { type: String, enum: ['pending', 'issued', 'dispatched'], default: 'pending' },
  sentDate: { type: Date },
  doorNumber: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema); 