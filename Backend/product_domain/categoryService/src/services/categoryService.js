// services/categoryService.js
const dynamo = require('../config/dynamoClient');
const {
  PutCommand,
  GetCommand,
  ScanCommand,
  UpdateCommand,
  DeleteCommand,
} = require('@aws-sdk/lib-dynamodb');

const tableName = 'Categories';

// SOLID - SRP: This function handles only category creation
// KISS: Uses clear structure to add a new item to DynamoDB
const createCategory = async (category) => {
  const command = new PutCommand({
    TableName: tableName,
    Item: category,
  });
  await dynamo.send(command);
};

// SRP: Retrieves a single category by ID
// POLA: Uses standard DynamoDB GetCommand
const getCategoryById = async (id) => {
  const command = new GetCommand({
    TableName: tableName,
    Key: { id },
  });
  const result = await dynamo.send(command);
  return result.Item;
};

// DRY: Centralized function to scan and return all categories
const getAllCategories = async () => {
  const command = new ScanCommand({
    TableName: tableName,
  });
  const result = await dynamo.send(command);
  return result.Items;
};

// SRP + KISS: Updates only 'name' and 'description' attributes
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

// SRP: Removes a category by its ID
const deleteCategory = async (id) => {
  const command = new DeleteCommand({
    TableName: tableName,
    Key: { id },
  });
  await dynamo.send(command);
};

module.exports = {
  createCategory,
  getCategoryById,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
