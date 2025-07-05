const { dynamoClient, TABLE_NAME } = require('../config/db');

const getAllProducts = async (req, res) => {
  const params = {
    TableName: TABLE_NAME
  };

  try {
    const data = await dynamoClient.scan(params).promise();
    res.json(data.Items);
  } catch (error) {
    res.status(500).json({ error: 'Error in obtaining products', details: error });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  const params = {
    TableName: TABLE_NAME,
    Key: { id }
  };

  try {
    const data = await dynamoClient.get(params).promise();
    if (!data.Item) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(data.Item);
  } catch (error) {
    res.status(500).json({ error: 'Error when searching for product', details: error });
  }
};

const getProductsByCategory = async (req, res) => {
  const { category_id } = req.params;

  const params = {
    TableName: TABLE_NAME,
    FilterExpression: 'category_id = :c',
    ExpressionAttributeValues: {
      ':c': category_id
    }
  };

  try {
    const data = await dynamoClient.scan(params).promise();
    res.json(data.Items);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving products by category', details: error });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductsByCategory
};
