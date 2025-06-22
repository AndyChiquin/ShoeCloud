const axios = require('axios');

const checkProductExists = async (product_id) => {
  try {
    const response = await axios.get(`http://54.166.240.10:3000/api/products/${product_id}`);
    return response.status === 200;
  } catch (error) {
    // Aquí entrará si el catalogService devuelve 404
    console.error('⚠️ Producto no encontrado o error en catalogService:', error.message);
    return false;
  }
};

module.exports = { checkProductExists };
