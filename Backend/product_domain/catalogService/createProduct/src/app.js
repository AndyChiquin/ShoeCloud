const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Crear tabla si no existe (opcional, solo en este microservicio)
require('./config/createTable');

// Usar solo las rutas de creación de productos
const createRoutes = require('./routes/createRoutes');
app.use('/api/products', createRoutes);

app.get('/', (req, res) => {
  res.send('✅ createProduct microservice is running 🚀');
});

app.listen(PORT, () => {
  console.log(`🟢 createProduct microservice running on port ${PORT}`);
});


//test