const express = require('express');
const app = express();
require('dotenv').config();

const categoryRoutes = require('./routes/deleteRoutes');
const { ListTablesCommand } = require('@aws-sdk/client-dynamodb');
const client = require('./config/dynamoClient');

app.use(express.json());
app.use('/api/category', categoryRoutes);

const PORT = process.env.PORT || 3002;

const waitForDynamo = async (retries = 5) => {
  for (let i = 0; i < retries; i++) {
    try {
      await client.send(new ListTablesCommand({}));
      console.log("✅ DynamoDB is ready");
      return;
    } catch (err) {
      console.log(`⏳ Waiting for DynamoDB... (${i + 1}/${retries})`);
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  throw new Error("❌ DynamoDB is not responding");
};

waitForDynamo().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ deleteCategory microservice running on port ${PORT}`);
  });
});
