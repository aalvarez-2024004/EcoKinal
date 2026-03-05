'use strict';

import dotenv from 'dotenv';
import { createApp } from './configs/app.js';
import { dbConnection } from './configs/db.js';
// Correcto si index.js está en la raíz
import gamificationRoutes from './src/gamification/gamification.routes.js';
// 🔹 Cargar variables de entorno
dotenv.config();

// 🔹 Crear la app
const app = createApp();

// 🔹 Montar rutas de gamificación
app.use('/gamification', gamificationRoutes);

// 🔹 Puerto
const PORT = process.env.PORT || 3008;

// 🔹 Iniciar servidor
const startServer = async () => {
    try {
        await dbConnection();

        app.listen(PORT, () => {
            console.log(`GamificationEcoKinal corriendo en puerto ${PORT}`);
        });

    } catch (error) {
        console.error('Error iniciando el servidor:', error);
        process.exit(1);
    }
};

startServer();