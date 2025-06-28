const express = require('express');
const router = express.Router();
const { deleteImagesByProductId } = require('../controllers/deleteController');

router.delete('/:product_id', deleteImagesByProductId);

module.exports = router;
