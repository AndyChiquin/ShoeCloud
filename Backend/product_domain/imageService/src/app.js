const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const imageRoutes = require('./routes/imageRoutes');

dotenv.config();

const app = express();

// ✅ MIDDLEWARE LAYER: Express JSON body parser
// ✅ SRP: Separation of request parsing from route logic
app.use(express.json());

// ✅ ROUTING LAYER (Controller): Routes decoupled in their own module
app.use('/api/images', imageRoutes);

// ✅ INFRASTRUCTURE LAYER: Database connection is handled externally
// ✅ CLEAN ARCHITECTURE: Startup logic separated from business logic
const PORT = process.env.PORT || 8007;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`📸 imageService running on port ${PORT}`);
  });
});

//test for actions