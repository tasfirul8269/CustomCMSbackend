const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobileNumber: { type: String, required: true },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  position: { type: String, enum: ['Manager', 'Supervisor', 'Staff'], default: 'Staff' },
  status: { type: String, enum: ['Live', 'Inactive'], default: 'Live' },
  dateOfBirth: { type: Date, required: true },
  licenseNumber: { type: String, required: true },
  joiningDate: { type: Date, required: true },
  leavingDate: { type: Date },
  contactNumber: { type: String },
  gender: { type: String, required: true },
  employeeVendor: { type: String },
  note: { type: String, required: true },
  photo: { type: String }, // URL to uploaded photo
  signature: { type: String }, // URL to uploaded signature
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema); 