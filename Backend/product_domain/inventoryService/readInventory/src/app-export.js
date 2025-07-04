const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(express.json());

const inventoryRoutes = require('./routes/readRoutes');
app.use('/api/inventory', inventoryRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'ReadInventory microservice is running' });
});

module.exports = app;
