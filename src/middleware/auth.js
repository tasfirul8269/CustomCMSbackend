const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(401).json({ message: 'User not found' });
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

const authorize = (roles = []) => {
  if (typeof roles === 'string') roles = [roles];
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient role' });
    }
    next();
  };
};

const authorizePermission = (resource, requiredAccess = 'read') => (req, res, next) => {
  const { role, permissions } = req.user;

  if (role === 'admin') {
    return next();
  }

  if (role === 'moderator') {
    const permission = permissions.find(p => p.resource === resource);
    
    if (permission) {
      // If user has write access, they can also read
      if (permission.access === 'write' || 
          (requiredAccess === 'read' && permission.access === 'read')) {
        return next();
      }
    }
  }

  return res.status(403).json({ 
    message: `Forbidden: You do not have ${requiredAccess} permission for ${resource}.` 
  });
};

module.exports = { auth, authorize, authorizePermission }; 