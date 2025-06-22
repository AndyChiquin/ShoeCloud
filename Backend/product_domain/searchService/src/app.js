const express = require('express');
const { connectDB } = require('./config/mongodb');
const createCollection = require('./models/createCollection');
const routes = require('./routes/searchRoutes');
require('dotenv').config(); // Asegúrate de tener esto para que .env cargue

const app = express();
const port = process.env.PORT || 8006;

app.use(express.json());
app.use('/api/search', routes);

// ✅ SRP - Single Responsibility Principle
// This file is responsible only for app configuration and startup, not business logic.

// ✅ KISS - Keep It Simple, Stupid
// The server is launched in a clean, understandable manner without unnecessary abstraction.

// ✅ DRY - Don't Repeat Yourself
// Configuration values and logic are reused from centralized modules (e.g., connectDB, routes).

app.listen(port, async () => {
  console.log(`SearchService running on port ${port}`);
  await connectDB();
  await createCollection();
});
