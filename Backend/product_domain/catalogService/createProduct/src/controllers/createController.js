const { dynamoClient, TABLE_NAME } = require('../config/db');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const { checkCategoryExists } = require('../services/categoryClient');
const WebSocket = require('ws');


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

    // Llamar a pricingService vía WebSocket si se proporciona un precio
    if (price) {
  const ws = new WebSocket('ws://52.2.232.26:4567/ws/price');

  ws.on('open', () => {
    const payload = {
      action: "create",
      data: {
        product_id: id,
        price: price,
        discount_type: "ninguno",
        percentage: 0,
        valid_until: null
      }
    };
    ws.send(JSON.stringify(payload));
    ws.close(); // cerramos inmediatamente tras enviar
  });

  ws.on('error', (err) => {
    console.error('❌ Error al conectar con pricingService (WebSocket):', err.message);
  });
}

    // Llamar a inventoryService
    if (quantity && quantity > 0) {
      try {
        await axios.post('http://13.216.150.108:3004/api/inventory', {
          product_id: id,
          quantity
        });
      } catch (invError) {
        console.error('❌ Error al conectar con inventoryService:', invError.message);
      }
    }

      // Notificar a searchService vía WebHook (solo se envía product_id)
      try {
        await axios.post('http://52.2.232.26:3017/index', {
          product_id: id
        });
      } catch (searchError) {
        console.error('❌ Error al conectar con searchService (WebHook):', searchError.message);
      }

    res.status(201).json({ message: 'Producto creado', product: item });
  } catch (error) {
    console.error('❌ Error creando producto:', error.message);
    res.status(500).json({ error: 'Error al crear producto', details: error.message });
  }
};

module.exports = { createProduct };
