// src/controllers/imageController.js

const Image = require('../models/Image');

// Crear una nueva imagen
const uploadImage = async (req, res) => {
  const { product_id, image_url } = req.body;

  try {
    const newImage = new Image({ product_id, image_url });
    await newImage.save();
    res.status(201).json({ message: 'Imagen subida correctamente', data: newImage });
  } catch (error) {
    res.status(500).json({ error: 'Error al subir imagen', details: error.message });
  }
};

// Obtener imagen(es) por ID de producto
const getImagesByProductId = async (req, res) => {
  const { product_id } = req.params;

  try {
    const images = await Image.find({ product_id });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener imágenes', details: error.message });
  }
};

// Actualizar imagen por ID de producto
const updateImageByProductId = async (req, res) => {
  const { product_id } = req.params;
  const { image_url } = req.body;

  try {
    const updated = await Image.findOneAndUpdate(
      { product_id },
      { image_url, uploaded_at: new Date() },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'No se encontró imagen para ese producto' });
    }

    res.status(200).json({ message: 'Imagen actualizada correctamente', data: updated });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar imagen', details: error.message });
  }
};



// Eliminar imagen por ID de producto (opcional)
const deleteImagesByProductId = async (req, res) => {
  const { product_id } = req.params;

  try {
    await Image.deleteMany({ product_id });
    res.status(200).json({ message: 'Imágenes eliminadas correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar imágenes', details: error.message });
  }
};

module.exports = {
  uploadImage,
  getImagesByProductId,
  deleteImagesByProductId,
  updateImageByProductId
};
