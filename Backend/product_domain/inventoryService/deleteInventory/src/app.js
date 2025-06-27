const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001; 

app.use(express.json());

const inventoryRoutes = require('./routes/deleteRoutes');
app.use('/api/inventory', inventoryRoutes);

app.get('/', (req, res) => {
  res.send('🗑️ deleteInventory microservice is running 🚀');
});

app.listen(PORT, () => {
  console.log(`🟢 deleteInventory microservice running on port ${PORT}`);
});


//test