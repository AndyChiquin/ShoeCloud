const { client } = require('../config/mongodb');

const getProductsByKeyword = async (keyword) => {
  const db = client.db(process.env.MONGO_DB_NAME);
  const collection = db.collection('products');

  const results = await collection.find({
    name: { $regex: keyword, $options: 'i' }
  }).toArray();

  return results;
};

module.exports = {
  getProductsByKeyword,
};
