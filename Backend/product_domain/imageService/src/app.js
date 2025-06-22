// src/app.js

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const imageRoutes = require('./routes/imageRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Rutas
app.use('/api/images', imageRoutes);

// Conexión a la BD y arranque del servidor
const PORT = process.env.PORT || 8007;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`📸 imageService running on port ${PORT}`);
  });
});

//test for actions 