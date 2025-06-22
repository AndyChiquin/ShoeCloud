const axios = require('axios');

// ✅ SERVICE LAYER: External API communication abstracted into reusable service
// ✅ SRP: Only responsible for verifying product existence
const checkProductExists = async (product_id) => {
  try {
    // ✅ API INTEGRATION: Communicating with catalogService
    const response = await axios.get(`http://54.166.240.10:3000/api/products/${product_id}`);
    return response.status === 200;
  } catch (error) {
    // ✅ FAIL-SAFE & LOGGING: Proper handling of failure cases
    console.error('⚠️ Producto no encontrado o error en catalogService:', error.message);
    return false;
  }
};

module.exports = { checkProductExists };
