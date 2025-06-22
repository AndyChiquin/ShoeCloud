const express = require('express');
const app = express();
require('dotenv').config(); // DRY: Loads configuration from .env

const categoryRoutes = require('./routes/categoryRoutes');
const { CreateTableCommand, ListTablesCommand } = require('@aws-sdk/client-dynamodb');
const client = require('./config/dynamoClient');

app.use(express.json());
app.use('/api/category', categoryRoutes);

const PORT = process.env.PORT || 3001;

// KISS + DRY: Isolated logic to wait for DynamoDB readiness
const waitForDynamo = async (retries = 5) => {
  const { ListTablesCommand } = require('@aws-sdk/client-dynamodb');

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

// SRP: This function only checks and creates the table if necessary
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

// KISS: Service is started only after the table is ready
createTableIfNotExists().then(() => {
  app.listen(PORT, () => {
    console.log(`CategoryService running on port ${PORT}`);
  });
});
