'use strict';

import jwt from 'jsonwebtoken';

export const validateJWT = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                ok: false,
                message: 'No se proporcionó un token válido'
            });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Guarda la información del usuario autenticado
        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            message: 'Token inválido o expirado'
        });
    }
};