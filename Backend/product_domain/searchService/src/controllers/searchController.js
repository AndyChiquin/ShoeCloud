const { client } = require('../config/mongodb');
require('dotenv').config();

// ✅ SRP - Single Responsibility Principle
// This controller handles only search-related requests (searching and indexing).

// ✅ DRY - Don't Repeat Yourself
// Repeated code such as db/collection access is abstracted for reuse.

// ✅ KISS - Keep It Simple, Stupid
// Logic is clear and direct, avoiding over-complication.

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

const indexProduct = async (req, res) => {
  const { name, description, category, price } = req.body;

  if (!name || !description || !category || !price) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    const db = client.db(process.env.MONGO_DB_NAME);
    const collection = db.collection('products');

    await collection.insertOne({ name, description, category, price });

    res.status(201).json({ message: 'Producto indexado correctamente' });
  } catch (err) {
    res.status(500).json({
      error: 'Error al indexar producto',
      details: err.message,
    });
  }
};

// ✅ Module Pattern
// Encapsulating controller logic and exporting as a module.

module.exports = { search, indexProduct };
