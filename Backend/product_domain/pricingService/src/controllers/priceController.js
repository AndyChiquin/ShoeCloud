const Price = require('../models/price');
const { get } = require('../routes/priceRoutes');

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

// Obtener un precio por ID
const getPriceById = async (req, res) => {
  try {
    const { id } = req.params;
    const price = await Price.findByPk(id);

    if (price) {
      res.json(price);
    } else {
      res.status(404).json({ error: "Price not found" });
    }
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

// Actualizar precio por product_id
const updatePriceByProductId = async (req, res) => {
  const { product_id } = req.params;
  const { price, percentage } = req.body;

  try {
    const [updated] = await Price.update(
      { price, percentage },
      { where: { product_id } }
    );

    if (updated) {
      const updatedPrice = await Price.findOne({ where: { product_id } });

      // 🔁 También actualiza en catalogService
      try {
        await axios.put(`http://54.166.240.10:3000/api/products/${product_id}`, {
          price: updatedPrice.price
        });
      } catch (catError) {
        console.error('❌ Error actualizando precio en catalogService:', catError.message);
      }

      res.json(updatedPrice);
    } else {
      res.status(404).json({ error: "No se encontró el precio con ese product_id" });
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
  getPricesByProduct,
  getPriceById,
  updatePriceByProductId
};



