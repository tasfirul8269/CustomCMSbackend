const Certificate = require('../models/Certificate');

const certificateController = {
  create: async (req, res) => {
    try {
      const { student, course, ...otherData } = req.body;
      const newItem = new Certificate({ student, course, ...otherData });
      await newItem.save();
      const populatedItem = await newItem.populate([
        { path: 'student', select: 'name' },
        { path: 'course', select: 'title' }
      ]);
      res.status(201).json(populatedItem);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const items = await Certificate.find(req.query).populate([
        { path: 'student', select: 'name' },
        { path: 'course', select: 'title' }
      ]);
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const item = await Certificate.findById(req.params.id).populate([
        { path: 'student', select: 'name' },
        { path: 'course', select: 'title' }
      ]);
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const item = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .populate([
          { path: 'student', select: 'name' },
          { path: 'course', select: 'title' }
        ]);
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.status(200).json(item);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const item = await Certificate.findByIdAndDelete(req.params.id);
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = certificateController; 