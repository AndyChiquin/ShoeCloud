const { DynamoDBClient, CreateTableCommand } = require('@aws-sdk/client-dynamodb');

// KISS + DRY: AWS client is configured once and reused throughout the script
const client = new DynamoDBClient({
  region: 'us-east-1',
  endpoint: "http://54.166.240.10:8002", // 👈 Replace with your public IP
  credentials: {
    accessKeyId: "fakeMyKeyId",
    secretAccessKey: "fakeSecretAccessKey"
  }
});

// SRP: This command defines only the schema and configuration for table creation
const command = new CreateTableCommand({
  TableName: "Categories",
  KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
  AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  }
});

// KISS: Simple self-invoking async function to execute the table creation
(async () => {
  try {
    await client.send(command);
    console.log("✅ Table created");
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
})();

