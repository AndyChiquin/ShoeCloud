const express = require('express');
const dotenv = require('dotenv');
dotenv.config(); 

const app = express();

app.use(express.json());

const deleteRoutes = require('./routes/deleteRoutes');
app.use('/api/products', deleteRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'DeleteProduct microservice is running' });
});

module.exports = app;
