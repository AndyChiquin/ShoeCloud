// src/routes/imageRoutes.js

const express = require('express');
const router = express.Router();
const {
  uploadImage,
  getImagesByProductId,
  deleteImagesByProductId
} = require('../controllers/imageController');

// Ruta para subir una imagen
router.post('/', uploadImage);

// Ruta para obtener imágenes por ID de producto
router.get('/:product_id', getImagesByProductId);

// Ruta para eliminar imágenes por ID de producto (opcional)
router.delete('/:product_id', deleteImagesByProductId);

module.exports = router;
