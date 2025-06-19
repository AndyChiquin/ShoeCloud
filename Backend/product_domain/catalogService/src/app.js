// src/app.js
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Crear tabla en DynamoDB Local si no existe
require('./config/createTable');

// Importar rutas de productos
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// Ruta base de prueba
app.get('/', (req, res) => {
  res.send('CatalogService is running 🚀');
});

app.listen(PORT, () => {
  console.log(`CatalogService running on port ${PORT}`);
});

// test for actions
