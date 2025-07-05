const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
  accessKeyId: 'fake',
  secretAccessKey: 'fake',
  region: process.env.AWS_REGION
});

const dynamodb = new AWS.DynamoDB({
  endpoint: process.env.DYNAMODB_LOCAL_ENDPOINT
});

const params = {
  TableName: process.env.DYNAMO_TABLE_NAME,
  KeySchema: [
    { AttributeName: 'id', KeyType: 'HASH' }  
  ],
  AttributeDefinitions: [
    { AttributeName: 'id', AttributeType: 'S' } 
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  }
};

dynamodb.describeTable({ TableName: params.TableName }, function (err, data) {
  if (err && err.code === 'ResourceNotFoundException') {
    dynamodb.createTable(params, (err, data) => {
      if (err) {
        console.error('❌ Error creating table:', err);
      } else {
        console.log('✅ Table created:', data.TableDescription.TableName);
      }
    });
  } else {
    console.log('ℹ️ The table already exists or there was another error:', err ? err.message : 'OK');
  }
});
