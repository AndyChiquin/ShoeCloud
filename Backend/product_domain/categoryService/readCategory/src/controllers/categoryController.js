const {
  createCategory,
  getCategoryById,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require('../services/categoryService');

const Category = require('../models/categoryModel');

// ✅ CONTROLLER: Handles the HTTP request/response cycle
// ✅ SRP (Single Responsibility): Each function handles only one thing
// ✅ KISS: Clear and direct logic
// ✅ Clean Architecture: Calls to the service layer for business logic

const create = async (req, res) => {
  try {
    const category = new Category(req.body);
    await createCategory(category);
    res.status(201).json({ message: 'Category created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const category = await getCategoryById(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAll = async (_req, res) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const updated = await updateCategory(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    await deleteCategory(req.params.id);
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  create,
  getById,
  getAll,
  update,
  remove,
};
