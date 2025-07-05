const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001; 

app.use(express.json());

const readRoutes = require('./routes/readRoutes');
app.use('/api/inventory', readRoutes);

app.get('/', (req, res) => {
  res.send('✅ readInventory microservice is running 🚀');
});

app.listen(PORT, () => {
  console.log(`🟢 readInventory microservice running on port ${PORT}`);
});

