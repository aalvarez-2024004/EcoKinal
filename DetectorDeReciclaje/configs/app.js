'use strict';
 
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import visionRoutes from '../src/ClasificacionImagen/clasificacion.routes.js';
 
const BASE_PATH = '/DetectorImagenReciclaje/v1';
 
export const createApp = () => {
    const app = express();
 
    // Middlewares
    app.use(express.json());
    app.use(cors());
    app.use(helmet());

    //Ruta
    app.use('/api/vision', visionRoutes);
 
    // Ruta de prueba
    app.get(`${BASE_PATH}/health`, (req, res) => {
        res.json({ message: 'API DetectorReciclaje corriendo ' });
    });
 
    return app;
};