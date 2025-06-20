const { client } = require('../config/mongodb');
require('dotenv').config();

const search = async (req, res) => {
  const searchTerm = req.query.query;

  if (!searchTerm || typeof searchTerm !== 'string') {
    return res.status(400).json({
      error: 'Search failed',
      details: '$regex has to be a string',
    });
  }

  try {
    const db = client.db(process.env.MONGO_DB_NAME);
    const collection = db.collection('products');

    const results = await collection.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } }
      ]
    }).toArray();

    res.json({ results });
  } catch (err) {
    res.status(500).json({
      error: 'Search failed',
      details: err.message,
    });
  }
};

module.exports = { search };
