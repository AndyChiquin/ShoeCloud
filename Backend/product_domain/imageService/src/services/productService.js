const axios = require('axios');

const checkProductExists = async (product_id) => {
  try {
    const response = await axios.get(`http://54.166.240.10:3000/api/products/${product_id}`);

    // ✅ Validar que exista un producto dentro del body
    if (response.data && response.data.product && response.data.product.id === product_id) {
      return true;
    }

    return false;

  } catch (error) {
    console.error('⚠️ Error al verificar producto en catalogService:', error.message);
    return false;
  }
};

module.exports = { checkProductExists };
