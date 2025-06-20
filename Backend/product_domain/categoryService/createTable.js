const { DynamoDBClient, CreateTableCommand } = require('@aws-sdk/client-dynamodb');

const client = new DynamoDBClient({
  region: 'us-east-1',
  endpoint: "http://54.166.240.10:8002", // 👈 Reemplaza con tu IP pública
  credentials: {
    accessKeyId: "fakeMyKeyId",
    secretAccessKey: "fakeSecretAccessKey"
  }
});

const command = new CreateTableCommand({
  TableName: "Categories",
  KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
  AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  }
});

(async () => {
  try {
    await client.send(command);
    console.log("✅ Table created");
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
})();
