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

// Actualizar un precio
const updatePrice = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Price.update(req.body, {
      where: { id }
    });

    if (updated) {
      const updatedPrice = await Price.findByPk(id);
      res.json(updatedPrice);
    } else {
      res.status(404).json({ error: "Price not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un precio
const deletePrice = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Price.destroy({
      where: { id }
    });

    if (deleted) {
      res.json({ message: "Price deleted successfully" });
    } else {
      res.status(404).json({ error: "Price not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener precios por product_id
const getPricesByProduct = async (req, res) => {
  try {
    const { product_id } = req.params;
    const prices = await Price.findAll({
      where: { product_id }
    });

    if (prices.length > 0) {
      res.json(prices);
    } else {
      res.status(404).json({ error: "No prices found for this product" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPrice,
  getAllPrices,
  updatePrice,
  deletePrice,
  getPricesByProduct
};



