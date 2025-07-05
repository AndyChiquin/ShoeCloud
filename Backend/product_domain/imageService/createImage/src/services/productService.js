const axios = require('axios');


const checkProductExists = async (product_id) => {
  try {
    const response = await axios.get(`http://13.216.150.108:3001/api/products/${product_id}`);
    return response.status === 200;
  } catch (error) {
    console.error('⚠️ Product not found or error in catalogService:', error.message);
    return false;
  }
};

module.exports = { checkProductExists };
