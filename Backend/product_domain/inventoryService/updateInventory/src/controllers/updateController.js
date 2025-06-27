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
      return res.status(404).json({ message: 'Inventario no encontrado para actualizar' });
    }

    res.status(200).json({
      message: 'Inventario actualizado correctamente',
      data: { id, quantity }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al actualizar inventario',
      details: error.message
    });
  }
};

module.exports = {
  updateInventory
};
