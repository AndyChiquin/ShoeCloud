const express = require('express');
require('dotenv').config();

const app = express();

const categoryRoutes = require('./routes/readRoutes');
app.use(express.json());
app.use('/api/category', categoryRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'ReadCategory microservice is running' });
});

module.exports = app;
