const express = require('express');
const dotenv = require('dotenv');
const imageRoutes = require('./routes/deleteRoutes');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/images', imageRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'DeleteImage microservice is running' });
});

module.exports = app;
