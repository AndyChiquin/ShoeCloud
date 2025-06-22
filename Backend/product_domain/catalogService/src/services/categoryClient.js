const axios = require('axios');

// DRY: Base URLs are defined as constants for reusability and easier maintenance
const CATEGORY_SERVICE_URL = process.env.CATEGORY_SERVICE_URL || 'http://category-service:3001/api/category'; // local version
const CATEGORY_SERVICE_PROD = 'http://54.166.240.10:3001/api/category';

// KISS: Simple helper function to check category existence via external service
// SRP: This function has only one responsibility — validate the category through HTTP call
async function checkCategoryExists(categoryId) {
  try {
    const response = await axios.get(`${CATEGORY_SERVICE_PROD}/${categoryId}`);
    return response.data && response.data.id === categoryId;
  } catch (error) {
    return false; // POLA: If the category does not exist or request fails, return false
  }
}

module.exports = { checkCategoryExists };
