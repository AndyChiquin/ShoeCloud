const axios = require('axios');

const CATEGORY_SERVICE_URL = process.env.CATEGORY_SERVICE_URL || 'http://category-service:3001/api/category'; // local version
const CATEGORY_SERVICE_PROD = 'http://54.166.240.10:3001/api/category';


async function checkCategoryExists(categoryId) {
  try {
    const response = await axios.get(`${CATEGORY_SERVICE_PROD}/${categoryId}`);
    return response.data && response.data.id === categoryId;
  } catch (error) {
    return false; 
  }
}

module.exports = { checkCategoryExists };
