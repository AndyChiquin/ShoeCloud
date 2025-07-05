const { v4: uuidv4 } = require('uuid');
const pool = require('../config/db');

const createInventory = async (req, res) => {
  const { product_id, quantity } = req.body;
  const id = uuidv4();
  let connection;

  try {
    connection = await pool.getConnection();
    const sql = 'INSERT INTO inventory (id, product_id, quantity) VALUES (?, ?, ?)';
    await connection.query(sql, [id, product_id, quantity]);

    res.status(201).json({
      message: 'Inventory created',
      data: { id, product_id, quantity }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error creating inventory',
      details: error.message
    });
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  createInventory
};
