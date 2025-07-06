const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CatalogService - readProduct',
      version: '1.0.0',
      description: 'API for reading products from the catalog',
    },
    servers: [
      {
        url: 'http://13.216.150.108:3001', 
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
