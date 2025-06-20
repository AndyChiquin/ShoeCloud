// app.js
const express = require('express');
const app = express();
const categoryRoutes = require('./routes/categoryRoutes');
require('dotenv').config();

app.use(express.json());

// Rutas base
app.use('/api/category', categoryRoutes);

// Puerto desde archivo .env o por defecto 3001
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`CategoryService running on port ${PORT}`);
});

const { CreateTableCommand } = require("@aws-sdk/client-dynamodb");
const client = require('./config/dynamoClient');

const createTableIfNotExists = async () => {
  try {
    // Esperar 3 segundos para que DynamoDB esté listo
    await new Promise(resolve => setTimeout(resolve, 3000));

    const command = new CreateTableCommand({
      TableName: "Categories",
      KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
      AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      }
    });

    await client.send(command);
    console.log("✅ Table 'Categories' created.");
  } catch (err) {
    if (err.name === "ResourceInUseException") {
      console.log("⚠️ Table already exists.");
    } else {
      console.error("❌ Table creation failed:", err.message);
    }
  }
};

createTableIfNotExists();
