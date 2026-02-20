'use strict';
 
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
 
import publicationRoutes from '../src/publications/public.routes.js';
 
const BASE_PATH = '/ForoEcoKinal/v1';
 
export const createApp = () => {
    const app = express();
 
    // Middlewares
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
 
    // Rutas
    app.use(`${BASE_PATH}/posts`, publicationRoutes);
 
    // Ruta de prueba
    app.get(`${BASE_PATH}/health`, (req, res) => {
        res.json({ message: 'API ForoEcoKinal corriendo ' });
    });
 
    return app;
};