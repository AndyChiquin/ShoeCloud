const dynamo = require('../config/dynamoClient');
const { UpdateCommand } = require('@aws-sdk/lib-dynamodb');

const tableName = 'Categories';

const updateCategory = async (id, data) => {
  const command = new UpdateCommand({
    TableName: tableName,
    Key: { id },
    UpdateExpression: 'set #n = :n, description = :d',
    ExpressionAttributeNames: {
      '#n': 'name',
    },
    ExpressionAttributeValues: {
      ':n': data.name,
      ':d': data.description,
    },
    ReturnValues: 'ALL_NEW',
  });

  const result = await dynamo.send(command);
  return result.Attributes;
};

module.exports = { updateCategory };
