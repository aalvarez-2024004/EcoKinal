'use strict';

import Gamification from './gamification.model.js';


//  Agregar puntos cuando se valida reciclaje
export const addPoints = async (req, res) => {
    try {
        const userId = req.user.uid;

        let userGamification = await Gamification.findOne({ userId });

        // Si no existe registro, lo creamos
        if (!userGamification) {
            userGamification = new Gamification({
                userId,
                points: 0,
                badges: [],
                recyclingCount: 0
            });
        }

        // Sumamos puntos
        userGamification.points += 10;
        userGamification.recyclingCount += 1;

        // Sistema de insignias automático
        if (userGamification.points >= 50 && !userGamification.badges.includes('Reciclador Básico')) {
            userGamification.badges.push('Reciclador Básico');
        }

        if (userGamification.points >= 150 && !userGamification.badges.includes('Reciclador Intermedio')) {
            userGamification.badges.push('Reciclador Intermedio');
        }

        if (userGamification.points >= 300 && !userGamification.badges.includes('Experto')) {
            userGamification.badges.push('Experto');
        }

        await userGamification.save();

        return res.status(200).json({
            ok: true,
            message: 'Puntos agregados correctamente',
            data: userGamification
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error al agregar puntos',
            error: error.message
        });
    }
};


//  Obtener perfil de gamificación del usuario
export const getMyGamification = async (req, res) => {
    try {
        const userId = req.user.uid;

        const data = await Gamification.findOne({ userId });

        if (!data) {
            return res.status(404).json({
                ok: false,
                message: 'No existe registro de gamificación'
            });
        }

        return res.status(200).json({
            ok: true,
            data
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error al obtener datos',
            error: error.message
        });
    }
};


// 🔹 Ranking global
export const getRanking = async (req, res) => {
    try {
        const ranking = await Gamification
            .find()
            .sort({ points: -1 })
            .limit(10);

        return res.status(200).json({
            ok: true,
            ranking
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error al obtener ranking',
            error: error.message
        });
    }
};