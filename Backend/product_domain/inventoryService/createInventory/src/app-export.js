const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(express.json());

const createInventoryTable = require('./models/Inventory');
createInventoryTable();

const createRoutes = require('./routes/createRoutes');
app.use('/api/inventory', createRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'CreateInventory microservice is running' });
});

module.exports = app;
