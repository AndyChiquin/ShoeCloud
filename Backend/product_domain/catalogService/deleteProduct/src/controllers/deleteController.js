const { dynamoClient, TABLE_NAME } = require('../config/db');
// const axios = require('axios'); // ❌ Desactivado porque aún no usamos inventoryService

// Eliminar producto
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  // Paso 1: Obtener el producto para extraer su product_id
  const getParams = {
    TableName: TABLE_NAME,
    Key: { id }
  };

  try {
    const data = await dynamoClient.get(getParams).promise();
    if (!data.Item) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const productId = data.Item.id;

    // Paso 2: Eliminar el producto de la tabla
    await dynamoClient.delete(getParams).promise();

    /*
    // Paso 3: Llamar al microservicio de inventario para eliminar el stock
    try {
      await axios.delete(`http://54.166.240.10:8005/api/inventory/${productId}`);
    } catch (invError) {
      console.error('❌ Error eliminando inventario:', invError.message);
    }
    */

    res.json({ message: 'Producto eliminado' });

  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto', details: error.message });
  }
};

module.exports = { deleteProduct };
