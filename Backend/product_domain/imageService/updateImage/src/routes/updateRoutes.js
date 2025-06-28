const express = require('express');
const router = express.Router();
const { updateImageByProductId } = require('../controllers/updateController');

router.put('/:product_id', updateImageByProductId);

module.exports = router;
