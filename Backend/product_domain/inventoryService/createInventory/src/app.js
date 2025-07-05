const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const createInventoryTable = require('./models/Inventory');
createInventoryTable();

const createRoutes = require('./routes/createRoutes');
app.use('/api/inventory', createRoutes);

app.get('/', (req, res) => {
  res.send('✅ createInventory microservice is running 🚀');
});

app.listen(PORT, () => {
  console.log(`🟢 createInventory microservice running on port ${PORT}`);
});


