const express = require('express');
const app = express();
require('dotenv').config();

const categoryRoutes = require('./routes/categoryRoutes');
const { CreateTableCommand, ListTablesCommand } = require('@aws-sdk/client-dynamodb');
const client = require('./config/dynamoClient');

app.use(express.json());
app.use('/api/category', categoryRoutes);

const PORT = process.env.PORT || 3001;

const createTableIfNotExists = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 3000)); // espera 3 segundos

    const tables = await client.send(new ListTablesCommand({}));
    if (tables.TableNames.includes('Categories')) {
      console.log("⚠️ La tabla ya existe");
      return;
    }

    const command = new CreateTableCommand({
      TableName: "Categories",
      KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
      AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
    });

    await client.send(command);
    console.log("✅ Tabla 'Categories' creada automáticamente");
  } catch (err) {
    console.error("❌ Error al crear tabla:", err.message);
  }
};

createTableIfNotExists().then(() => {
  app.listen(PORT, () => {
    console.log(`CategoryService corriendo en puerto ${PORT}`);
  });
});
