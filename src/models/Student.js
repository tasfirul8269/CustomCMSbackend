const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  location: { type: String },
  enrollmentDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'inactive', 'graduated'], default: 'active' },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  totalPaid: { type: Number, default: 0 },
  address: { type: String },
  city: { type: String },
  postcode: { type: String },
  gender: { type: String },
  batchNo: { type: String },
  vendor: { type: String },
  bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  courseType: { type: String },
  assignmentStatus: { type: String, enum: ['pending', 'complete'], default: 'pending' },
  assignmentDate: { type: Date },
  note: { type: String },
  admissionType: { type: String },
  paymentSlots: { type: String },
  courseFee: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  received: { type: Number, default: 0 },
  refund: { type: Number, default: 0 },
  balanceDue: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema); 