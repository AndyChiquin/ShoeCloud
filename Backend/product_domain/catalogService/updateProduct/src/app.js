const express = require('express');
const dotenv = require('dotenv');
dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 
const { swaggerUi, swaggerSpec } = require('./config/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const updateRoutes = require('./routes/updateRoutes');
app.use('/api/products', updateRoutes);

app.get('/', (req, res) => {
  res.send('✅ updateProduct microservice is running 🚀');
});

app.listen(PORT, () => {
  console.log(`🟢 updateProduct microservice running on port ${PORT}`);
});
