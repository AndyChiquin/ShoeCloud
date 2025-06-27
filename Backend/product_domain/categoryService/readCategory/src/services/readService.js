const dynamo = require('../config/dynamoClient');
const { GetCommand, ScanCommand } = require('@aws-sdk/lib-dynamodb');

const tableName = 'Categories';

const getCategoryById = async (id) => {
  const command = new GetCommand({
    TableName: tableName,
    Key: { id },
  });
  const result = await dynamo.send(command);
  return result.Item;
};

const getAllCategories = async () => {
  const command = new ScanCommand({
    TableName: tableName,
  });
  const result = await dynamo.send(command);
  return result.Items;
};

module.exports = {
  getCategoryById,
  getAllCategories,
};
