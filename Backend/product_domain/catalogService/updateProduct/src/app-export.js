const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(express.json());

const updateRoutes = require('./routes/updateRoutes');
app.use('/api/products', updateRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'UpdateProduct microservice is running' });
});

module.exports = app;
