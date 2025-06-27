const { updateCategory } = require('../services/updateService');

const update = async (req, res) => {
  try {
    const updated = await updateCategory(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { update };
