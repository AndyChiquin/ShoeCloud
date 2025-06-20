const express = require('express');
const app = express();
require('dotenv').config();

const categoryRoutes = require('./routes/categoryRoutes');
const { CreateTableCommand, ListTablesCommand } = require('@aws-sdk/client-dynamodb');
const client = require('./config/dynamoClient');

app.use(express.json());
app.use('/api/category', categoryRoutes);

const PORT = process.env.PORT || 3001;

// Función que verifica si Dynamo está disponible
const waitForDynamo = async (retries = 5) => {
  const { ListTablesCommand } = require('@aws-sdk/client-dynamodb');

  for (let i = 0; i < retries; i++) {
    try {
      await client.send(new ListTablesCommand({}));
      console.log("✅ DynamoDB is ready");
      return;
    } catch (err) {
      console.log(`⏳ Esperando que Dynamo esté listo... (${i + 1}/${retries})`);
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  throw new Error("❌ DynamoDB no respondió tras varios intentos");
};

// Crear tabla si no existe
const createTableIfNotExists = async () => {
  try {
    await waitForDynamo();

    const tables = await client.send(new ListTablesCommand({}));
    if (tables.TableNames.includes('Categories')) {
      console.log("⚠️ Tabla 'Categories' ya existe");
      return;
    }

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
    console.log("✅ Tabla 'Categories' creada correctamente");
  } catch (err) {
    console.error("❌ Error al crear tabla:", err.message);
  }
};

createTableIfNotExists().then(() => {
  app.listen(PORT, () => {
    console.log(`CategoryService corriendo en puerto ${PORT}`);
  });
});

// test of actions 