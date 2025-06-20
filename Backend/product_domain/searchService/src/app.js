const express = require('express');
const cors = require('cors');
require('dotenv').config();

const createTable = require('./models/createTable');
createTable();

const searchRoutes = require('./routes/searchRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', searchRoutes);

const PORT = process.env.PORT || 8006;
app.listen(PORT, () => {
  console.log(`SearchService running on port ${PORT}`);
});
