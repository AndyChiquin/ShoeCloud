// src/routes/imageRoutes.js

const express = require('express');
const router = express.Router();
const {
  uploadImage,
  getImagesByProductId,
  deleteImagesByProductId,
  updateImageByProductId,
  getAllImages
} = require('../controllers/imageController');

// 📦 [Routing Layer] — Defines HTTP endpoints for image-related operations

// 🔼 Upload an image (POST /api/images/)
router.post('/', uploadImage);

// 🔍 Get images by product ID (GET /api/images/:product_id)
router.get('/:product_id', getImagesByProductId);

// 🔄 Get all images (GET /api/images/)
router.get('/', getAllImages);

// ✏️ Update image by product ID (PUT /api/images/:product_id)
router.put('/:product_id', updateImageByProductId);

// ❌ Delete images by product ID (DELETE /api/images/:product_id)
router.delete('/:product_id', deleteImagesByProductId);

module.exports = router;
