'use strict'
import { detectarLabels } from "./clasificacion.service.js";
import Clasificacion from "./clasificacion.model.js";
import fs from "fs";
import axios from 'axios';

export const clasificarImagen = async (req, res) => {

    let imagePath = null;

    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Debes enviar una imagen"
            });
        }

        imagePath = req.file.path;

        const labels = await detectarLabels(imagePath, req.file.mimetype);

        const resultado = clasificarResiduo(labels);

        const registro = await Clasificacion.create({
            imagen: req.file.filename,
            labels,
            tipo: resultado.tipo,
            contenedor: resultado.contenedor
        });

                // *** Aquí agregamos la llamada para sumar puntos ***
        try {
            await axios.post('http://localhost:3008/gamification/add-points', {}, {
                headers: {
                    Authorization: req.headers.authorization // Pasamos el token JWT
                }
            });
        } catch (error) {
            console.error('Error al sumar puntos en gamificación:', error.message);
            // No abortamos el proceso principal, solo logueamos el error
        }

        return res.status(200).json({
            success: true,
            message: "Imagen clasificada correctamente",
            data: registro
        });

    } catch (error) {
        
        if (imagePath && fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        return res.status(500).json({
            success: false,
            message: "Error al clasificar la imagen",
            error: error.message
        });
    }
};

const clasificarResiduo = (labels) => {
    //convierte a minusculas y se unen todos los labels en un solo texto
    const texto = labels.join(" ").toLowerCase();

    //Residuos peligrosos
    if (texto.includes("battery") || texto.includes("batteries") ||
        texto.includes("chemical") || texto.includes("medicine") ||
        texto.includes("syringe") || texto.includes("paint") ||
        texto.includes("oil"))
    {
        return {
            tipo: "Residuo Peligroso",
            descripcion: "Requiere manejo especial por ser contaminante.",
            contenedor: "Llévalo a un punto de recolección especial ROJO"
        };
    }

    //Todo lo organico
    if (texto.includes("food") || texto.includes("fruit") || texto.includes("vegetable") ||
        texto.includes("banana") || texto.includes("apple") || texto.includes("meat") ||
        texto.includes("bread") || texto.includes("egg") || texto.includes("leaf") ||
        texto.includes("plant") || texto.includes("wood") || texto.includes("flower") ||
        texto.includes("orange") || texto.includes("lemon") || texto.includes("grass"))
    {
        return {
            tipo: "Orgánico",
            descripcion: "Este residuo se descompone naturalmente.",
            contenedor: "Esto va en el contenedor VERDE"
        };
    }

    //Todo lo Inorgánico
    if (texto.includes("plastic") || texto.includes("metal") || texto.includes("can") ||
        texto.includes("glass") || texto.includes("electronic") || texto.includes("cable") ||
        texto.includes("wire") || texto.includes("aluminum") || texto.includes("rubber") ||
        texto.includes("tire"))
    {
        return {
            tipo: "Inorgánico",
            descripcion: "No se descompone fácilmente y debe reciclarse.",
            contenedor: "Esto va en el contenedor de reciclaje"
        };
    }

    //Todo lo reutilizable
    if (texto.includes("box") || texto.includes("jar") || texto.includes("bottle") ||
        texto.includes("tool") || texto.includes("bag") || texto.includes("furniture") ||
        texto.includes("cloth") || texto.includes("clothing") || texto.includes("shoe") ||
        texto.includes("toy") || texto.includes("book"))
    {
        return {
            tipo: "Reutilizable",
            descripcion: "Puede reutilizarse antes de desecharse.",
            contenedor: "Esto lo puedes guardar para usarlo de nuevo o hacer alguna manualidad"
        };
    }

    //Lo no reciclable
    return {
        tipo: "No reciclable",
        descripcion: "No se puede reciclar ni reutilizar fácilmente.",
        contenedor: "Esto va en el contenedor GRIS"
    };

}
