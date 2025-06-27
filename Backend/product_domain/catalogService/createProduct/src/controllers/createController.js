const { dynamoClient, TABLE_NAME } = require('../config/db');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const { checkCategoryExists } = require('../services/categoryClient');

// Crear producto
const createProduct = async (req, res) => {
  const { name, description, category_id, price, brand, quantity } = req.body;
  const id = uuidv4();

  // Validar existencia de la categoría
  const categoryExists = await checkCategoryExists(category_id);
  if (!categoryExists) {
    return res.status(400).json({ error: 'La categoría no existe en category-service' });
  }

  const item = {
    id,
    name,
    description,
    category_id,
    price,
    brand
  };

  const params = {
    TableName: TABLE_NAME,
    Item: item
  };

  try {
    // Crear producto en DynamoDB
    await dynamoClient.put(params).promise();

    // // Llamar a pricingService
    // if (price) {
    //   try {
    //     await axios.post('http://100.24.79.116:8008/api/price', {
    //       product_id: id,
    //       price: price,
    //       discount_type: "ninguno",
    //       percentage: 0,
    //       valid_until: null
    //     });
    //   } catch (pricingError) {
    //     console.error('❌ Error al conectar con pricingService:', pricingError.message);
    //   }
    // }

    // // Llamar a inventoryService
    // if (quantity && quantity > 0) {
    //   try {
    //     await axios.post('http://54.166.240.10:8005/api/inventory', {
    //       product_id: id,
    //       quantity
    //     });
    //   } catch (invError) {
    //     console.error('❌ Error al conectar con inventoryService:', invError.message);
    //   }
    // }

    // // Llamar a searchService
    // try {
    //   await axios.post('http://100.24.79.116:8006/api/search/index', {
    //     id,
    //     name,
    //     description,
    //     category: category_id,
    //     price
    //   });
    // } catch (searchError) {
    //   console.error('❌ Error al conectar con searchService:', searchError.message);
    // }

    res.status(201).json({ message: 'Producto creado', product: item });
  } catch (error) {
    console.error('❌ Error creando producto:', error.message);
    res.status(500).json({ error: 'Error al crear producto', details: error.message });
  }
};

module.exports = { createProduct };
