const Image = require('../models/Image');
// const { checkProductExists } = require('../services/readService');

const getAllImages = async (req, res) => {
  try {
    const images = await Image.find({});
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving images', details: error.message });
  }
};

const getImagesByProductId = async (req, res) => {
  const { product_id } = req.params;

  // const exists = await checkProductExists(product_id);
  // if (!exists) {
  //   return res.status(404).json({ error: 'Product not found in catalogService' });
  // }

  try {
    const images = await Image.find({ product_id });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving images', details: error.message });
  }
};

module.exports = {
  getAllImages,
  getImagesByProductId,
};
