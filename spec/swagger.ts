const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Blog Website',
            version: '1.0.0',
            description: 'Documentations',
        },
    },
    // swagger defination
    apis: ['./spec/api.yaml'],
};

module.exports = swaggerJSDoc(options);