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

/**
 * @swagger
 * /gamification/add-points:
 *   post:
 *     summary: Agregar 10 puntos por reciclaje validado
 *     tags: [Gamification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Puntos agregados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/add-points', validateJWT, addPoints);

//  Obtener mi perfil de gamificación

/**
 * @swagger
 * /gamification/me:
 *   get:
 *     summary: Obtener perfil de gamificación del usuario autenticado
 *     tags: [Gamification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: No existe registro
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error del servidor
 */
router.get('/me', validateJWT, getMyGamification);

//  Obtener ranking global
/**
 * @swagger
 * /gamification/ranking:
 *   get:
 *     summary: Obtener ranking global top 10
 *     tags: [Gamification]
 *     responses:
 *       200:
 *         description: Ranking obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RankingResponse'
 *       500:
 *         description: Error del servidor
 */
router.get('/ranking', getRanking);

export default router;