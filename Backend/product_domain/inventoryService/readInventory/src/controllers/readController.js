const pool = require('../config/db');

const getAllInventory = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM inventory');
    connection.release();

    res.json(rows);
  } catch (error) {
    res.status(500).json({
      error: 'Error when obtaining inventory',
      details: error.message
    });
  }
};

const getInventoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM inventory WHERE id = ?', [id]);
    connection.release();

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Inventory not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      error: 'Error when searching for inventory',
      details: error.message
    });
  }
};

module.exports = {
  getAllInventory,
  getInventoryById
};
