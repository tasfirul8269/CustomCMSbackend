const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  fullName: { type: String },
  email: { type: String },
  mobileNumber: { type: String },
  addressLine1: { type: String },
  addressLine2: { type: String },
  position: { type: String, enum: ['Manager', 'Supervisor', 'Staff'], default: 'Staff' },
  status: { type: String, enum: ['Live', 'Inactive'], default: 'Live' },
  dateOfBirth: { type: Date },
  licenseNumber: { type: String },
  joiningDate: { type: Date },
  leavingDate: { type: Date },
  contactNumber: { type: String },
  gender: { type: String },
  employeeVendor: { type: String },
  note: { type: String },
  photo: { type: String }, // URL to uploaded photo
  signature: { type: String }, // URL to uploaded signature
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema); 