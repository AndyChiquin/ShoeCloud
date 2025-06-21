const express = require('express');
const router = express.Router();
const { createPrice, getAllPrices } = require('../controllers/priceController');

router.post('/price', createPrice);
router.get('/price', getAllPrices);

module.exports = router;
