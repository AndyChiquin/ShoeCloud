// src/services/productService.js

const axios = require('axios');

const checkProductExists = async (product_id) => {
  try {
    const response = await axios.get(`http://54.166.240.10:3000/api/products/${product_id}`);
    return response.status === 200;
  } catch (error) {
    console.error('⚠️ Error al verificar producto en catalogService:', error.message);
    return false;
  }
};

module.exports = { checkProductExists };
