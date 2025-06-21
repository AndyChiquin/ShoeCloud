const express = require('express');
const router = express.Router();
const { createPrice, getAllPrices, updatePrice, deletePrice, getPricesByProduct, getPriceById} = require('../controllers/priceController');

router.post('/price', createPrice);
router.get('/price', getAllPrices);
router.put('/price/:id', updatePrice);
router.delete('/price/:id', deletePrice);   
router.get('/price/product/:product_id', getPricesByProduct);
router.get('/price/:id', getPriceById);


module.exports = router;
