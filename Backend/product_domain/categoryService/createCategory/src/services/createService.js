const dynamo = require('../config/dynamoClient');
const { PutCommand } = require('@aws-sdk/lib-dynamodb');

const tableName = 'Categories';

const createCategory = async (category) => {
  const command = new PutCommand({
    TableName: tableName,
    Item: category,
  });
  await dynamo.send(command);
};

module.exports = { createCategory };
