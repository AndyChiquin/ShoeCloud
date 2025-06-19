// src/controllers/productController.js
const { dynamoClient, TABLE_NAME } = require('../config/db');
const { v4: uuidv4 } = require('uuid');

// Crear producto
const createProduct = async (req, res) => {
  const { name, description, category_id, price, brand, stock } = req.body;
  const id = uuidv4();

  const item = {
    id,
    name,
    description,
    category_id,
    price,
    brand,
    stock
  };

  const params = {
    TableName: TABLE_NAME,
    Item: item
  };

  try {
    await dynamoClient.put(params).promise();
    res.status(201).json({ message: 'Producto creado', product: item });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto', details: error });
  }
};

// Obtener todos los productos
const getAllProducts = async (req, res) => {
  const params = {
    TableName: TABLE_NAME
  };

  try {
    const data = await dynamoClient.scan(params).promise();
    res.json(data.Items);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos', details: error });
  }
};

// Obtener producto por ID
const getProductById = async (req, res) => {
  const { id } = req.params;

  const params = {
    TableName: TABLE_NAME,
    Key: { id }
  };

  try {
    const data = await dynamoClient.get(params).promise();
    if (!data.Item) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(data.Item);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar producto', details: error });
  }
};

// Actualizar producto
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, category_id, price, brand, stock } = req.body;

  const params = {
    TableName: TABLE_NAME,
    Key: { id },
    UpdateExpression: 'set #n = :n, description = :d, category_id = :c, price = :p, brand = :b, stock = :s',
    ExpressionAttributeNames: { '#n': 'name' },
    ExpressionAttributeValues: {
      ':n': name,
      ':d': description,
      ':c': category_id,
      ':p': price,
      ':b': brand,
      ':s': stock
    },
    ReturnValues: 'ALL_NEW'
  };

  try {
    const data = await dynamoClient.update(params).promise();
    res.json({ message: 'Producto actualizado', product: data.Attributes });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar producto', details: error });
  }
};

// Eliminar producto
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const params = {
    TableName: TABLE_NAME,
    Key: { id }
  };

  try {
    await dynamoClient.delete(params).promise();
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto', details: error });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
