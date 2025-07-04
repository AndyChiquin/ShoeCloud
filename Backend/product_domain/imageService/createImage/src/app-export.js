const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const imageRoutes = require('./routes/createRoutes');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/images', imageRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'CreateImage microservice is running' });
});

module.exports = app;
