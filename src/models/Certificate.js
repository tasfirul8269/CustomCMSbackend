const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  issueDate: { type: Date },
  certificateNumber: { type: String },
  status: { type: String, enum: ['pending', 'issued', 'dispatched'], default: 'pending' },
  sentDate: { type: Date },
  doorNumber: { type: String },
  zipCode: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema); 