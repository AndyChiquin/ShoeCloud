const Image = require('../models/Image');
const { checkProductExists } = require('../services/productService');

const deleteImagesByProductId = async (req, res) => {
  const { product_id } = req.params;

  const exists = await checkProductExists(product_id);
  if (!exists) {
    return res.status(404).json({ error: 'Product not found in catalogService' });
  }

  try {
    const result = await Image.deleteMany({ product_id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No images found to delete for this product_id' });
    }

    res.status(200).json({ message: 'Images deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting images', details: error.message });
  }
};

module.exports = { deleteImagesByProductId };
