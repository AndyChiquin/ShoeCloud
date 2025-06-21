const express = require('express');
const router = express.Router();
const { createPrice, getAllPrices, updatePrice, deletePrice, getPricesByProduct, getPriceById, updatePriceByProductId} = require('../controllers/priceController');

router.post('/price', createPrice);
router.get('/price', getAllPrices);
router.put('/price/:id', updatePrice);
router.delete('/price/:id', deletePrice);   
router.get('/price/product/:product_id', getPricesByProduct);
router.get('/price/:id', getPriceById);
router.put('/by-product/:product_id', updatePriceByProductId);



module.exports = router;
