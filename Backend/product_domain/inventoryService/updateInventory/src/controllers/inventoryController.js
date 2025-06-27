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
      message: 'Inventario creado',
      data: { id, product_id, quantity }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al crear inventario',
      details: error.message
    });
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  createInventory
};


const getAllInventory = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM inventory');
    connection.release();

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener inventario', details: error });
  }
};

const getInventoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM inventory WHERE id = ?', [id]);
    connection.release();

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Inventario no encontrado' });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar inventario', details: error });
  }
};

const updateInventory = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const connection = await pool.getConnection();
    const sql = 'UPDATE inventory SET quantity = ? WHERE id = ?';
    await connection.query(sql, [quantity, id]);
    connection.release();

    res.json({ message: 'Inventario actualizado', data: { id, quantity } });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar inventario', details: error });
  }
};

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

    res.status(200).json({ message: 'Inventario eliminado', product_id: id });

  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar inventario', details: error.message });
  }
};

module.exports = {
  createInventory,
  getAllInventory,
  getInventoryById,
  updateInventory,
  deleteInventory
};
