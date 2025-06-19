const AWS = require('aws-sdk');
require('dotenv').config();

const dynamodb = new AWS.DynamoDB({
  region: process.env.AWS_REGION,
  endpoint: process.env.DYNAMODB_LOCAL_ENDPOINT,
  accessKeyId: 'dummy-access-key',
  secretAccessKey: 'dummy-secret-key'
});

const params = {
  TableName: process.env.DYNAMO_TABLE_NAME,
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
};

dynamodb.describeTable({ TableName: process.env.DYNAMO_TABLE_NAME }, (err, data) => {
  if (err && err.code === 'ResourceNotFoundException') {
    console.log("La tabla no existe. Creándola...");
    dynamodb.createTable(params, (err, data) => {
      if (err) {
        console.error("❌ Error creando la tabla:", err);
      } else {
        console.log("✅ Tabla creada con éxito:", data.TableDescription.TableName);
      }
    });
  } else if (data) {
    console.log("✅ La tabla ya existe:", data.Table.TableName);
  } else {
    console.error("❌ Error al verificar tabla:", err);
  }
});
