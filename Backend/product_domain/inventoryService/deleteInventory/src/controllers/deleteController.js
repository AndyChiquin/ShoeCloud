const pool = require('../config/db');

const deleteInventory = async (req, res) => {
  const { id } = req.params;
  let connection;

  try {
    connection = await pool.getConnection();

    const sql = 'DELETE FROM inventory WHERE product_id = ?';
    const [result] = await connection.query(sql, [id]);

    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Inventario no encontrado' });
    }

    res.status(200).json({
      message: 'Inventario eliminado correctamente',
      deleted_product_id: id
    });

  } catch (error) {
    res.status(500).json({
      error: 'Error al eliminar inventario',
      details: error.message
    });
  }
};

module.exports = {
  deleteInventory
};
