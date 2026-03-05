'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import visionRoutes from '../src/ClasificacionImagen/clasificacion.routes.js';

const BASE_PATH = '/DetectorImagenReciclaje/v1';

export const createApp = () => {
    const app = express();

    // Middlewares
    app.use(express.json());
    app.use(cors());
    app.use(helmet());

    // Swagger config
    const swaggerOptions = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "API Detector de Reciclaje",
                version: "1.0.0",
                description: "Documentación de la API para clasificar imágenes reciclables"
            },
            servers: [
                {
                    url: "http://localhost:3007"
                }
            ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                    }
                }
            }
        },
        apis: ["./src/ClasificacionImagen/**/*.js"] // aquí busca los comentarios swagger
    };

    const swaggerSpec = swaggerJsdoc(swaggerOptions);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Rutas
    app.use('/api/vision', visionRoutes);

    // Ruta de prueba
    app.get(`${BASE_PATH}/health`, (req, res) => {
        res.json({ message: 'API DetectorReciclaje corriendo' });
    });

    return app;
};