const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  updateProductByProductId
} = require('../controllers/productController');

// KISS + SRP: Routes are defined clearly and delegated to controller functions

// Create a new product
router.post('/', createProduct);

// Get all products by category
router.get('/category/:category_id', getProductsByCategory);

// Get all products
router.get('/', getAllProducts);

// Get a product by its ID
router.get('/:id', getProductById);

// Update a product by its ID
router.put('/:id', updateProduct);

// Delete a product by its ID
router.delete('/:id', deleteProduct);

// Update product using an alternate identifier
router.put('/by-product/:product_id', updateProductByProductId);

module.exports = router;
