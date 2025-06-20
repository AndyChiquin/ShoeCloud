const axios = require('axios');

const CATEGORY_SERVICE_URL = process.env.CATEGORY_SERVICE_URL || 'http://category-service:3001/api/category';

async function checkCategoryExists(categoryId) {
  try {
    const response = await axios.get(`${CATEGORY_SERVICE_URL}/${categoryId}`);
    return !!response.data?.id;
  } catch (err) {
    console.error('❌ Error contactando a category-service:', err.message);
    return false;
  }
}

module.exports = { checkCategoryExists };
