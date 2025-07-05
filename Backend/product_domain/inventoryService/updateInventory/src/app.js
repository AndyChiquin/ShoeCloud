const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const updateRoutes = require('./routes/updateRoutes');
app.use('/api/inventory', updateRoutes);

app.get('/', (req, res) => {
  res.send('🟢 updateInventory microservice is running 🚀');
});

app.listen(PORT, () => {
  console.log(`✅ updateInventory microservice running on port ${PORT}`);
});