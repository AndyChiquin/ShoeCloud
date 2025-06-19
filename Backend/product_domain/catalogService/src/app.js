// src/app.js
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Crear tabla al iniciar
require('./config/createTable');

// Usar rutas del producto
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.send('CatalogService is running 🚀');
});

app.listen(PORT, () => {
  console.log(`CatalogService running on port ${PORT}`);
});
