const { dynamoClient, TABLE_NAME } = require('../config/db');
const notifyPricingService = require('../services/priceNotifier');


const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, category_id, price, brand } = req.body;

  if (typeof price !== 'undefined' && !name && !description && !category_id && !brand) {
    const soloPrecio = {
      TableName: TABLE_NAME,
      Key: { id: String(id) },
      UpdateExpression: 'set price = :p',
      ExpressionAttributeValues: {
        ':p': price
      },
      ReturnValues: 'ALL_NEW'
    };

    try {
      const result = await dynamoClient.update(soloPrecio).promise();
      notifyPricingService(id, price);
      return res.json({ message: 'Updated price', product: result.Attributes });
    } catch (error) {
      return res.status(500).json({ error: 'Error updating price only', details: error.message });
    }
  }

  const params = {
    TableName: TABLE_NAME,
    Key: { id },
    UpdateExpression: 'set #n = :n, description = :d, category_id = :c, price = :p, brand = :b',
    ExpressionAttributeNames: { '#n': 'name' },
    ExpressionAttributeValues: {
      ':n': name,
      ':d': description,
      ':c': category_id,
      ':p': price,
      ':b': brand
    },
    ReturnValues: 'ALL_NEW'
  };

  try {
    const data = await dynamoClient.update(params).promise();
    res.json({ message: 'Updated product', product: data.Attributes });
  } catch (error) {
    res.status(500).json({ error: 'Error when upgrading product', details: error });
  }
};

const updateProductByProductId = async (req, res) => {
  const { product_id } = req.params;
  const { price } = req.body;

  if (typeof price === 'undefined') {
    return res.status(400).json({ error: 'Missing price to update' });
  }

  const params = {
    TableName: TABLE_NAME,
    Key: { id: product_id },
    UpdateExpression: 'set price = :p',
    ExpressionAttributeValues: {
      ':p': price
    },
    ReturnValues: 'ALL_NEW'
  };

  try {
    const result = await dynamoClient.update(params).promise();
    res.json({ message: 'Price updated by product_id', product: result.Attributes });
  } catch (error) {
    res.status(500).json({ error: 'Error updating price with product_id', details: error.message });
  }
};

module.exports = {
  updateProduct,
  updateProductByProductId
};
