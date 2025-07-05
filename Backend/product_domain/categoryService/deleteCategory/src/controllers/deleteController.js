const { deleteCategory } = require('../services/deleteService');

const remove = async (req, res) => {
  try {
    await deleteCategory(req.params.id);
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { remove };
