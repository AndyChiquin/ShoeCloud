const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
  accessKeyId: 'fakeMyKeyId',
  secretAccessKey: 'fakeSecretAccessKey',
  region: process.env.AWS_REGION
});

const dynamoClient = new AWS.DynamoDB.DocumentClient({
  endpoint: process.env.DYNAMODB_LOCAL_ENDPOINT
});

const TABLE_NAME = process.env.DYNAMO_TABLE_NAME;

module.exports = { dynamoClient, TABLE_NAME };
