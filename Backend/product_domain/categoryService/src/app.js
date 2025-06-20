const express = require('express');
const app = express();
require('dotenv').config();

const categoryRoutes = require('./routes/categoryRoutes');
const { CreateTableCommand, ListTablesCommand } = require('@aws-sdk/client-dynamodb');
const client = require('./config/dynamoClient');

// Middleware
app.use(express.json());

// Rutas
app.use('/api/category', categoryRoutes);

// Puerto
const PORT = process.env.PORT || 3001;

// Crear tabla si no existe
const createTableIfNotExists = async () => {
  try {
    // Esperar que DynamoDB esté disponible
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Verificar si ya existe la tabla
    const listCommand = new ListTablesCommand({});
    const tables = await client.send(listCommand);
    if (tables.TableNames.includes('Categories')) {
      console.log("⚠️ Table 'Categories' already exists.");
      return;
    }

    // Crear la tabla si no existe
    const createCommand = new CreateTableCommand({
      TableName: "Categories",
      KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
      AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      }
    });

    await client.send(createCommand);
    console.log("✅ Table 'Categories' created.");
  } catch (error) {
    console.error("❌ Error creating table:", error.message);
  }
};

// 🔁 Ejecutar creación de tabla y levantar server
createTableIfNotExists().then(() => {
  app.listen(PORT, () => {
    console.log(`CategoryService running on port ${PORT}`);
  });
});
