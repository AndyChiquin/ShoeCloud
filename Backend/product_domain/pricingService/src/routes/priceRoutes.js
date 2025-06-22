const express = require('express');
const router = express.Router();
const {
  createPrice,
  getAllPrices,
  updatePrice,
  deletePrice,
  getPricesByProduct,
  getPriceById,
  updatePriceByProductId
} = require('../controllers/priceController');

// ✅ SRP - Single Responsibility Principle (from SOLID)
// Each route maps to a specific controller function with a single purpose
router.post('/price', createPrice);
router.get('/price', getAllPrices);
router.put('/price/:id', updatePrice);
router.delete('/price/:id', deletePrice);
router.get('/price/product/:product_id', getPricesByProduct);
router.get('/price/:id', getPriceById);
router.put('/by-product/:product_id', updatePriceByProductId);

// ✅ DRY - Don't Repeat Yourself
// Reusable controller methods are imported and used consistently across routes

// ✅ Open/Closed Principle (from SOLID)
// Routes are open for extension (you can add more), but existing logic doesn't need modification

module.exports = router;
