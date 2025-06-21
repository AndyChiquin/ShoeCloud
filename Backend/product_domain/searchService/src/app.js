const express = require('express');
const { connectDB } = require('./config/mongodb');
const createCollection = require('./models/createCollection');
const routes = require('./routes/searchRoutes');
require('dotenv').config(); // Asegúrate de tener esto para que .env cargue

const app = express();
const port = process.env.PORT || 8006;

app.use(express.json());
app.use('/api/search', routes);

app.listen(port, async () => {
  console.log(`SearchService running on port ${port}`);
  await connectDB();
  await createCollection();
});

//test for actions 2