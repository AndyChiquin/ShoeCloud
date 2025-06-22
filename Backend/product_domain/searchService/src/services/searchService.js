const searchModel = require('../models/searchModel');

// ✅ SRP - Single Responsibility Principle
// This service handles only the interaction between controller and model for search logic.

// ✅ DRY - Don't Repeat Yourself
// The model function is reused instead of writing the logic again in this service layer.

// ✅ LAYERED ARCHITECTURE
// This service acts as an intermediary layer between controller and model for cleaner separation.

const searchProducts = async (keyword) => {
  return await searchModel.getProductsByKeyword(keyword);
};

module.exports = {
  searchProducts,
};
