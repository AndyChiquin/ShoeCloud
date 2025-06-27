const express = require('express');
const router = express.Router();
const {
  updateProduct,
  updateProductByProductId
} = require('../controllers/updateController');

router.put('/:id', updateProduct);
router.put('/by-product/:product_id', updateProductByProductId);

module.exports = router;
