const express = require('express');
const dotenv = require('dotenv');
dotenv.config(); 

const app = express();

app.use(express.json());

const readRoutes = require('./routes/readRoutes');
app.use('/api/products', readRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'ReadProduct microservice is running' });
});

module.exports = app;
