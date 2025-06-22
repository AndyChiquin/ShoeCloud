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

// Ruta para subir una imagen
router.post('/', uploadImage);

// Ruta para obtener imágenes por ID de producto
router.get('/:product_id', getImagesByProductId);

// Ruta para obtener todas las imágenes 
router.get('/', getAllImages);

//Ruta para actualizar imagen por ID de producto
router.put('/:product_id', updateImageByProductId);

// Ruta para eliminar imágenes por ID de producto 
router.delete('/:product_id', deleteImagesByProductId);


module.exports = router;
