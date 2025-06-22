const express = require('express');
const app = express();
const sequelize = require('./config/db');
const priceRoutes = require('./routes/priceRoutes');

app.use(express.json());

// ✅ SRP - Single Responsibility Principle (from SOLID)
// Each module (routes, DB config, server setup) has a single, well-defined responsibility
app.use('/api', priceRoutes);

const PORT = process.env.PORT || 8008;

// ✅ KISS - Keep It Simple, Stupid
// Simple and readable logic to initialize the service
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`PricingService running on port ${PORT}`);
  });
});

// ✅ Encapsulation
// Configuration and business logic are separated into dedicated files
