const express = require('express');
const app = express();
const sequelize = require('./config/db');
const priceRoutes = require('./routes/priceRoutes');

app.use(express.json());

app.use('/api', priceRoutes);

const PORT = process.env.PORT || 8008;


sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`PricingService running on port ${PORT}`);
  });
});

