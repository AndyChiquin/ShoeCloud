const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8005;

app.use(express.json()); 


const createInventoryTable = require('./models/Inventory');
createInventoryTable(); 


const inventoryRoutes = require('./routes/inventoryRoutes');
app.use('/api/inventory', inventoryRoutes); 


app.get('/', (req, res) => {
  res.send('InventoryService is running 🚀');
});


app.listen(PORT, () => {
  console.log(`InventoryService running on port ${PORT}`); // ✅ KISS
});
