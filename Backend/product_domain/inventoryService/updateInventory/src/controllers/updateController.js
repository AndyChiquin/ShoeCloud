const pool = require('../config/db');

const updateInventory = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const connection = await pool.getConnection();
    const sql = 'UPDATE inventory SET quantity = ? WHERE id = ?';
    const [result] = await connection.query(sql, [quantity, id]);
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Inventory not found to update' });
    }

    res.status(200).json({
      message: 'Correctly updated inventory',
      data: { id, quantity }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error updating inventory',
      details: error.message
    });
  }
};

module.exports = {
  updateInventory
};
