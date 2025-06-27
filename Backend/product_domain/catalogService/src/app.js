const express = require('express');
const dotenv = require('dotenv');
dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 

require('./config/createTable');

const productRoutes = require('./routes/productRoutes');

app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('CatalogService is running 🚀');
});

app.listen(PORT, () => {
  console.log(`CatalogService running on port ${PORT}`);
});
