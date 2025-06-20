// app.js
const express = require('express');
const app = express();
require('dotenv').config();

const categoryRoutes = require('./routes/categoryRoutes');
const { CreateTableCommand, ListTablesCommand } = require('@aws-sdk/client-dynamodb');
const client = require('./config/dynamoClient');

app.use(express.json());
app.use('/api/category', categoryRoutes);

const PORT = process.env.PORT || 3001;

// 🔁 Crear tabla si no existe
const createTableIfNotExists = async () => {
  try {
    // Esperar 3 segundos a que Dynamo esté 100% listo
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Verificar si la tabla ya existe
    const listCommand = new ListTablesCommand({});
    const tables = await client.send(listCommand);

    if (tables.TableNames.includes('Categories')) {
      console.log("⚠️ La tabla 'Categories' ya existe.");
      return;
    }

    // Si no existe, crearla
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
    console.log("✅ Tabla 'Categories' creada correctamente.");
  } catch (err) {
    console.error("❌ Error al crear tabla:", err.message);
  }
};

// 🔁 Primero crear tabla, luego arrancar server
createTableIfNotExists().then(() => {
  app.listen(PORT, () => {
    console.log(`CategoryService corriendo en el puerto ${PORT}`);
  });
});
