// src/controllers/imageController.js

const Image = require('../models/Image');
const { checkProductExists } = require('../services/productService');

// 📤 Upload a new image (Controller Layer + Validation + DB interaction)
const uploadImage = async (req, res) => {
  const { product_id, image_url } = req.body;

  // 🔍 [Validation Pattern] — Ensure the product exists in the catalogService
  const exists = await checkProductExists(product_id);
  if (!exists) {
    return res.status(404).json({ error: 'Product not found in catalogService' });
  }

  try {
    const newImage = new Image({ product_id, image_url });
    await newImage.save();
    res.status(201).json({ message: 'Image uploaded successfully', data: newImage });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading image', details: error.message });
  }
};

// 📄 Retrieve all images (optional, for admin/debug use)
const getAllImages = async (req, res) => {
  try {
    const images = await Image.find({});
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving images', details: error.message });
  }
};

// 🔍 Retrieve images by product ID
const getImagesByProductId = async (req, res) => {
  const { product_id } = req.params;

  const exists = await checkProductExists(product_id);
  if (!exists) {
    return res.status(404).json({ error: 'Product not found in catalogService' });
  }

  try {
    const images = await Image.find({ product_id });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving images', details: error.message });
  }
};

// ✏️ Update an image by product ID
const updateImageByProductId = async (req, res) => {
  const { product_id } = req.params;
  const { image_url } = req.body;

  const exists = await checkProductExists(product_id);
  if (!exists) {
    return res.status(404).json({ error: 'Product not found in catalogService' });
  }

  try {
    const updated = await Image.findOneAndUpdate(
      { product_id },
      { image_url, uploaded_at: new Date() },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'No image found for this product' });
    }

    res.status(200).json({ message: 'Image updated successfully', data: updated });
  } catch (error) {
    res.status(500).json({ error: 'Error updating image', details: error.message });
  }
};

// 🗑️ Delete images by product ID
const deleteImagesByProductId = async (req, res) => {
  const { product_id } = req.params;

  const exists = await checkProductExists(product_id);
  if (!exists) {
    return res.status(404).json({ error: 'Product not found in catalogService' });
  }

  try {
    await Image.deleteMany({ product_id });
    res.status(200).json({ message: 'Images deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting images', details: error.message });
  }
};

module.exports = {
  uploadImage,
  getImagesByProductId,
  deleteImagesByProductId,
  updateImageByProductId,
  getAllImages
};
