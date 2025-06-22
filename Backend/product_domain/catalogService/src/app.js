const express = require('express');
const dotenv = require('dotenv');
dotenv.config(); // DRY: Loads environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // POLA: Parses incoming JSON, expected behavior for APIs

// DRY: Table creation logic is centralized in a config file
require('./config/createTable');

const productRoutes = require('./routes/productRoutes');

// KISS + SRP: Routes are separated into a dedicated module
app.use('/api/products', productRoutes);

// KISS: Simple health check route
app.get('/', (req, res) => {
  res.send('CatalogService is running 🚀');
});

// POLA: Starts the service in a predictable, conventional way
app.listen(PORT, () => {
  console.log(`CatalogService running on port ${PORT}`);
});
