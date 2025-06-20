// src/controllers/productController.js
const { dynamoClient, TABLE_NAME } = require('../config/db');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const { checkCategoryExists } = require('../services/categoryClient');



// Crear producto
const createProduct = async (req, res) => {
  const { name, description, category_id, price, brand, quantity } = req.body;
  const id = uuidv4();

  // validar si la categoría existe
  const categoryExists = await checkCategoryExists(category_id);
  if (!categoryExists) {
    return res.status(400).json({ error: 'La categoría no existe en category-service' });
  }

  const item = {
    id,
    name,
    description,
    category_id,
    price,
    brand
  };

  const params = {
    TableName: TABLE_NAME,
    Item: item
  };

  try {
  await dynamoClient.put(params).promise();

  // 🟡 Llamar a inventoryService (protegido)
  if (quantity && quantity > 0) {
    try {
      await axios.post('http://54.166.240.10:8005/api/inventory', {
        product_id: id,
        quantity
      });
    } catch (invError) {
      console.error('❌ Error al conectar con inventoryService:', invError.message);
      // No detenemos la creación del producto
    }
  }

  res.status(201).json({ message: 'Producto creado', product: item });

} catch (error) {
  console.error('❌ Error creando producto:', error.message);
  res.status(500).json({ error: 'Error al crear producto', details: error.message });
}
};

// ✅ ESTA función va fuera de createProduct
const getProductsByCategory = async (req, res) => {
  const { category_id } = req.params;

  const params = {
    TableName: TABLE_NAME,
    FilterExpression: 'category_id = :c',
    ExpressionAttributeValues: {
      ':c': category_id
    }
  };

  try {
    const data = await dynamoClient.scan(params).promise();
    res.json(data.Items);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos por categoría', details: error });
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
  const { name, description, category_id, price, brand } = req.body;

  const params = {
    TableName: TABLE_NAME,
    Key: { id },
    UpdateExpression: 'set #n = :n, description = :d, category_id = :c, price = :p, brand = :b',
    ExpressionAttributeNames: { '#n': 'name' },
    ExpressionAttributeValues: {
      ':n': name,
      ':d': description,
      ':c': category_id,
      ':p': price,
      ':b': brand
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
    await axios.delete(`http://54.166.240.10:8005/api/inventory/${id}`);

    res.json({ message: 'Producto eliminado y stock removido' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto', details: error });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory
};
