// app.js
const express = require('express');
const app = express();
const categoryRoutes = require('./routes/categoryRoutes');
require('dotenv').config();

app.use(express.json());

// Rutas base
app.use('/api/category', categoryRoutes);

// Puerto desde archivo .env o por defecto 3001
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`CategoryService running on port ${PORT}`);
});

