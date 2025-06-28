
const express = require('express');
const router = express.Router();
const {
  uploadImage,
  getImagesByProductId,
  deleteImagesByProductId,
  updateImageByProductId,
  getAllImages
} = require('../controllers/imageController');


router.post('/', uploadImage);

router.get('/:product_id', getImagesByProductId);

router.get('/', getAllImages);

router.put('/:product_id', updateImageByProductId);

router.delete('/:product_id', deleteImagesByProductId);

module.exports = router;
