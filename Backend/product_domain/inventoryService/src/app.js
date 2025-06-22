const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8005;

app.use(express.json()); // ✅ KISS (Keep It Simple, Stupid) - simple middleware para parsear JSON

// ✅ SRP (Single Responsibility Principle - SOLID):
// La función createInventoryTable se encarga exclusivamente de preparar la tabla DynamoDB
const createInventoryTable = require('./models/Inventory');
createInventoryTable(); // ✅ Initialization Pattern

// ✅ SRP + DRY:
// Separación de rutas en archivo independiente para reutilización y claridad
const inventoryRoutes = require('./routes/inventoryRoutes');
app.use('/api/inventory', inventoryRoutes); // ✅ Routing Pattern + KISS

// ✅ KISS + Readability:
// Ruta de prueba para ver si el servicio está corriendo
app.get('/', (req, res) => {
  res.send('InventoryService is running 🚀');
});

// ✅ SRP + Encapsulación:
// Lógica de escucha separada y simple
app.listen(PORT, () => {
  console.log(`InventoryService running on port ${PORT}`); // ✅ KISS
});
