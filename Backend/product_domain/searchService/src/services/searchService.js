const searchModel = require('../models/searchModel');

const searchProducts = async (keyword) => {
  return await searchModel.getProductsByKeyword(keyword);
};

module.exports = {
  searchProducts,
};
