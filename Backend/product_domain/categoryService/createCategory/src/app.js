const express = require('express');
const app = express();
require('dotenv').config();

const categoryRoutes = require('./routes/createRoutes');
const { CreateTableCommand, ListTablesCommand } = require('@aws-sdk/client-dynamodb');
const client = require('./config/dynamoClient');

app.use(express.json());
app.use('/api/category', categoryRoutes);

const PORT = process.env.PORT || 3001;

// Espera a que DynamoDB esté listo
const waitForDynamo = async (retries = 5) => {
  for (let i = 0; i < retries; i++) {
    try {
      await client.send(new ListTablesCommand({}));
      console.log("✅ DynamoDB is ready");
      return;
    } catch (err) {
      console.log(`⏳ Waiting for DynamoDB to be ready... (${i + 1}/${retries})`);
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  throw new Error("❌ DynamoDB did not respond after multiple attempts");
};

// Crea la tabla 'Categories' si no existe
const createTableIfNotExists = async () => {
  try {
    await waitForDynamo();

    const tables = await client.send(new ListTablesCommand({}));
    if (tables.TableNames.includes('Categories')) {
      console.log("⚠️ Table 'Categories' already exists");
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
    console.log("✅ Table 'Categories' created successfully");
  } catch (err) {
    console.error("❌ Error creating table:", err.message);
  }
};

createTableIfNotExists().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ createCategory microservice running on port ${PORT}`);
  });
});
