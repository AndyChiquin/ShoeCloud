const { createCategory } = require('../services/createService');
const Category = require('../models/categoryModel');

const create = async (req, res) => {
  try {
    const category = new Category(req.body);
    await createCategory(category);
    res.status(201).json({ message: 'Category created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { create };
