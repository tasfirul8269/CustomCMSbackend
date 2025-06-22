const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Get all users (Admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    const usersWithId = users.map(user => ({
      id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      role: user.role,
      permissions: user.permissions,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }));
    res.json(usersWithId);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Register Admin or Moderator (Admin only)
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, permissions, profileImage } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Name, email, password, and role are required' });
    }
    if (role === 'moderator' && (!permissions || !permissions.length)) {
      return res.status(400).json({ message: 'Permissions are required for moderators' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      profileImage: profileImage || null,
      role,
      permissions: role === 'moderator' ? permissions : [],
    });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user (Admin only)
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, permissions, profileImage } = req.body;
    
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if email is being changed and if it already exists
    if (email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    user.profileImage = profileImage !== undefined ? profileImage : user.profileImage;
    user.permissions = role === 'moderator' ? (permissions || []) : [];

    await user.save();
    res.json({ message: 'User updated successfully', user: { 
      id: user._id, 
      name: user.name, 
      email: user.email, 
      profileImage: user.profileImage,
      role: user.role, 
      permissions: user.permissions 
    }});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete user (Admin only)
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Prevent admin from deleting themselves
    if (req.user.id === id) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name,
        email: user.email, 
        profileImage: user.profileImage,
        role: user.role, 
        permissions: user.permissions 
      } 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 