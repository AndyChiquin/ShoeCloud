const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  getProductsByCategory
} = require('../controllers/readController');

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.get('/category/:category_id', getProductsByCategory);

module.exports = router;
