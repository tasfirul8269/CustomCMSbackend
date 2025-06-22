const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  company: { type: String },
  services: [{ type: String }],
  contractValue: { type: Number },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  logo: { type: String },
  fax: { type: String },
  webAddress: { type: String },
  addressLine1: { type: String },
  addressLine2: { type: String },
  registrationNumber: { type: String },
  invoicePrefix: { type: String },
  published: { type: Boolean, default: false },
  approvedBy: [{ type: String }],
  accountInfo: { type: String },
}, { timestamps: true });

console.log('Loaded Vendor model with approvedBy as String');
console.log('Vendor approvedBy schema type:', vendorSchema.path('approvedBy').caster.instance);
delete mongoose.models.Vendor;
module.exports = mongoose.model('Vendor', vendorSchema); 