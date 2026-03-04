'use strict';

import { Router } from 'express';
import { validateJWT } from '../../middlewares/validate-JWT.js';
import {
    addPoints,
    getMyGamification,
    getRanking
} from './gamification.controller.js';

const router = Router();

// Sumar puntos (cuando Detector valide reciclaje)
router.post('/add-points', validateJWT, addPoints);

//  Obtener mi perfil de gamificación
router.get('/me', validateJWT, getMyGamification);

//  Obtener ranking global
router.get('/ranking', getRanking);

export { router as gamificationRoutes };