const express = require('express');
const dotenv = require('dotenv');
dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 

const deleteRoutes = require('./routes/deleteRoutes');
app.use('/api/products', deleteRoutes);

app.get('/', (req, res) => {
  res.send('✅ deleteProduct microservice is running 🚀');
});

app.listen(PORT, () => {
  console.log(`🟢 deleteProduct microservice running on port ${PORT}`);
});
