const createCRUDController = (Model) => ({
  create: async (req, res) => {
    try {
      const item = new Model(req.body);
      await item.save();
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const items = await Model.find(req.query);
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getById: async (req, res) => {
    try {
      const item = await Model.findById(req.params.id);
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
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
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
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
});

module.exports = createCRUDController; 