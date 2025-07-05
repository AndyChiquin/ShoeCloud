const { dynamoClient, TABLE_NAME } = require('../config/db');
const axios = require('axios'); 

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const getParams = {
    TableName: TABLE_NAME,
    Key: { id }
  };

  try {
    const data = await dynamoClient.get(getParams).promise();
    if (!data.Item) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const productId = data.Item.id;

    await dynamoClient.delete(getParams).promise();

    
    // Call inventory microservice to remove the stock
    try {
      await axios.delete(`http://13.216.150.108:3007/api/inventory/${productId}`);
    } catch (invError) {
      console.error('❌ Error deleting inventory:', invError.message);
    }
    

    res.json({ message: 'Product eliminated' });

  } catch (error) {
    res.status(500).json({ error: 'Error deleting product', details: error.message });
  }
};

module.exports = { deleteProduct };
