const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'InventoryService - deleteInventory',
      version: '1.0.0',
      description: 'API for deleting inventory items',
    },
    servers: [
      {
        url: 'http://13.216.150.108:3007',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
