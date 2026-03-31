const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Slim Moms API',
      version: '1.0.0',
      description: 'Diyet ve Kalori Takip Uygulaması API Dokümantasyonu',
    },
    servers: [{ url: process.env.API_URL || 'http://localhost:5000' }],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  // __dirname kullanarak server/ klasörünü hedefliyoruz
apis: [
    path.join(__dirname, '../docs/*.js'),
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
