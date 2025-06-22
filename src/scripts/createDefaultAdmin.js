const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

const createDefaultAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('Default admin already exists');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = new User({
      name: 'System Administrator',
      email: 'admin@example.com',
      password: hashedPassword,
      profileImage: null,
      role: 'admin',
      permissions: [],
    });

    await admin.save();
    console.log('Default admin created successfully');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');
    process.exit(0);
  } catch (error) {
    console.error('Error creating default admin:', error);
    process.exit(1);
  }
};

createDefaultAdmin(); 