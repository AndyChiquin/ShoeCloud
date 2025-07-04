const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

require('./config/createTable');

const createRoutes = require('./routes/createRoutes');
app.use('/api/products', createRoutes);

app.get('/', (req, res) => {
  res.send('✅ createProduct microservice is running 🚀');
});

app.listen(PORT, () => {
  console.log(`🟢 createProduct microservice running on port ${PORT}`);
});

//test