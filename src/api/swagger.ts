import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Molecular mass calculator",
            version: "1.0.0",
            description: "Molecular mass calculator"
        }
    },
    apis: ['./controllers/*.js']
}

const swaggerSpec = swaggerJSDoc(options);

export {swaggerSpec};