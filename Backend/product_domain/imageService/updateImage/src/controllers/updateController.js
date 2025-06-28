const Image = require('../models/Image');
// const { checkProductExists } = require('../services/productService');

const updateImageByProductId = async (req, res) => {
  const { product_id } = req.params;
  const { image_url } = req.body;

  // const exists = await checkProductExists(product_id);
  // if (!exists) {
  //   return res.status(404).json({ error: 'Product not found in catalogService' });
  // }

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

module.exports = { updateImageByProductId };
