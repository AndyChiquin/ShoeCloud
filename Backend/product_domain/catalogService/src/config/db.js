// src/config/db.js
const AWS = require('aws-sdk');
require('dotenv').config();

const dynamoClient = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,                  // Obligatorio para que el SDK funcione
  endpoint: process.env.DYNAMODB_LOCAL_ENDPOINT,   // Conectado al contenedor local
  accessKeyId: 'dummy-access-key',                 // Falso, pero requerido por el SDK
  secretAccessKey: 'dummy-secret-key'
});

const TABLE_NAME = process.env.DYNAMO_TABLE_NAME;

module.exports = { dynamoClient, TABLE_NAME };
