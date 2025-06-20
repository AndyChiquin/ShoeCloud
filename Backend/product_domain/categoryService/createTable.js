const { DynamoDBClient, CreateTableCommand } = require("@aws-sdk/client-dynamodb");
require('dotenv').config();

const client = new DynamoDBClient({
  region: 'us-east-1',
  endpoint: process.env.DYNAMO_ENDPOINT,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const command = new CreateTableCommand({
  TableName: "Categories",
  KeySchema: [
    { AttributeName: "id", KeyType: "HASH" }
  ],
  AttributeDefinitions: [
    { AttributeName: "id", AttributeType: "S" }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  }
});

(async () => {
  try {
    await client.send(command);
    console.log("✅ Table 'Categories' created successfully.");
  } catch (err) {
    console.error("❌ Error creating table:", err.message);
  }
})();
