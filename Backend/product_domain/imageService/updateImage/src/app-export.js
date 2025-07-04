const express = require('express');
const dotenv = require('dotenv');
const imageRoutes = require('./routes/updateRoutes');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/images', imageRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'UpdateImage microservice is running' });
});

module.exports = app;
