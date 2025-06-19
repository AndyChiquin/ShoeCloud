// src/config/createTable.js
const AWS = require('aws-sdk');
require('dotenv').config();

// Cliente base de DynamoDB para creación de tabla
const dynamodb = new AWS.DynamoDB({
  region: process.env.AWS_REGION,
  endpoint: process.env.DYNAMODB_LOCAL_ENDPOINT,
  accessKeyId: 'dummy-access-key',
  secretAccessKey: 'dummy-secret-key'
});

const params = {
  TableName: process.env.DYNAMO_TABLE_NAME,
  KeySchema: [
    { AttributeName: "id", KeyType: "HASH" } // Clave primaria
  ],
  AttributeDefinitions: [
    { AttributeName: "id", AttributeType: "S" } // Tipo string
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  }
};

// Crear tabla si no existe
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
