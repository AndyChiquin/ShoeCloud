const express = require('express');
const dotenv = require('dotenv');
dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 

const readRoutes = require('./routes/readRoutes');
app.use('/api/products', readRoutes);

app.get('/', (req, res) => {
  res.send('✅ readProduct microservice is running 🚀');
});

app.listen(PORT, () => {
  console.log(`🟢 readProduct microservice running on port ${PORT}`);
});
