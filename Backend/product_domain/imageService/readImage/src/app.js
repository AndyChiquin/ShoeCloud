const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const imageRoutes = require('./routes/imageRoutes');

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/images', imageRoutes);

const PORT = process.env.PORT || 8007;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`📸 imageService running on port ${PORT}`);
  });
});
