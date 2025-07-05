const { dynamoClient, TABLE_NAME } = require('../config/db');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const { checkCategoryExists } = require('../services/categoryClient');
const notifyPricingService = require('../services/priceNotifier');



const createProduct = async (req, res) => {
  const { name, description, category_id, price, brand, quantity } = req.body;
  const id = uuidv4();

  // Validate existence of the category
  const categoryExists = await checkCategoryExists(category_id);
  if (!categoryExists) {
    return res.status(400).json({ error: 'Category does not exist in category-service' });
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
    // Create product in DynamoDB
    await dynamoClient.put(params).promise();

    // Calling pricingService via WebSocket if a price is provided
    if (price) {
  notifyPricingService(id, price);
}


    // Call inventoryService
    if (quantity && quantity > 0) {
      try {
        await axios.post('http://13.216.150.108:3004/api/inventory', {
          product_id: id,
          quantity
        });
      } catch (invError) {
        console.error('❌ Error connecting to inventoryService:', invError.message);
      }
    }

      // Notify searchService via WebHook (only product_id is sent)
      try {
        await axios.post('http://52.2.232.26:3017/index', {
          product_id: id
        });
      } catch (searchError) {
        console.error('❌ Error when connecting to searchService (WebHook):', searchError.message);
      }

    res.status(201).json({ message: 'Product created', product: item });
  } catch (error) {
    console.error('❌ Error creating product:', error.message);
    res.status(500).json({ error: 'Error creating product', details: error.message });
  }
};

module.exports = { createProduct };
