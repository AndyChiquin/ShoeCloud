const express = require('express');
const { connectDB } = require('./config/mongodb');
const createCollection = require('./models/createCollection');
const routes = require('./routes/searchRoutes');

const app = express();
const port = process.env.PORT || 8006;

app.use(express.json());
app.use('/api/search', routes);

app.listen(port, async () => {
  console.log(`SearchService running on port ${port}`);
  await connectDB();
  await createCollection();
});
