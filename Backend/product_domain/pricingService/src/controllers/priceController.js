const Price = require('../models/price');

// Crear precio
const createPrice = async (req, res) => {
  try {
    const price = await Price.create(req.body);
    res.status(201).json(price);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar precios
const getAllPrices = async (req, res) => {
  try {
    const prices = await Price.findAll();
    res.json(prices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPrice,
  getAllPrices
};
