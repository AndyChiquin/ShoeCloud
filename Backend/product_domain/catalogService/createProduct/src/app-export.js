// src/app-export.js
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(express.json());

require('./config/createTable');

const createRoutes = require('./routes/createRoutes');
app.use('/api/products', createRoutes);

// 🔁 Respuesta esperada por la prueba
app.get('/', (req, res) => {
  res.status(200).json({ message: 'CreateProduct microservice is running' });
});

module.exports = app;
