const AWS = require('aws-sdk');
require('dotenv').config();

const dynamoClient = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
  endpoint: process.env.DYNAMODB_LOCAL_ENDPOINT,
  accessKeyId: 'dummy-access-key',
  secretAccessKey: 'dummy-secret-key'
});

const TABLE_NAME = process.env.DYNAMO_TABLE_NAME;

module.exports = { dynamoClient, TABLE_NAME };
