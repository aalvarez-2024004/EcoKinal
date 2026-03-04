'use strict';

import dotenv from 'dotenv';
import { createApp } from './configs/app.js';
import { dbConnection } from './configs/db.js';

dotenv.config();

const app = createApp();
const PORT = process.env.PORT || 3007;

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