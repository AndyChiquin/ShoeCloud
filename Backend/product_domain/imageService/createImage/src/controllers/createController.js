const Image = require('../models/Image');
const { checkProductExists } = require('../services/productService');

const uploadImage = async (req, res) => {
  const { product_id, image_url } = req.body;

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

module.exports = { uploadImage };
