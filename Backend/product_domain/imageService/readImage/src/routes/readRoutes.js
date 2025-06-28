const express = require('express');
const router = express.Router();
const {
  getImagesByProductId,
  getAllImages
} = require('../controllers/readController');

router.get('/', getAllImages);

router.get('/:product_id', getImagesByProductId);

module.exports = router;
