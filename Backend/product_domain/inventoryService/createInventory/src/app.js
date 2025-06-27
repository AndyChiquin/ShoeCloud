const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8005;

app.use(express.json());

// Crear tabla si no existe
const createInventoryTable = require('./models/Inventory');
createInventoryTable();

// Usar solo rutas de creación
const createRoutes = require('./routes/createRoutes');
app.use('/api/inventory', createRoutes);

app.get('/', (req, res) => {
  res.send('✅ createInventory microservice is running 🚀');
});

app.listen(PORT, () => {
  console.log(`🟢 createInventory microservice running on port ${PORT}`);
});
