const dynamo = require('../config/dynamoClient');
const { DeleteCommand } = require('@aws-sdk/lib-dynamodb');

const tableName = 'Categories';

const deleteCategory = async (id) => {
  const command = new DeleteCommand({
    TableName: tableName,
    Key: { id },
  });
  await dynamo.send(command);
};

module.exports = { deleteCategory };
