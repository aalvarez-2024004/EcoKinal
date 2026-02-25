import { detectarLabels } from "./clasificacion.service.js";
import Clasificacion from "./clasificacion.model.js";
import fs from "fs";

export const clasificarImagen = async (req, res) => {
    try {

        const labels = await detectarLabels(req.file.path);
        const resultado = clasificarResiduo(labels);

        const registro = await Clasificacion.create({
        imagen: req.file.filename,
        labels,
        tipo: resultado.tipo,
        contenedor: resultado.contenedor
        });

        //eliminar la imagen para no saturar el servidor
        fs.unlinkSync(req.file.path);

        return res.status(200).json({
            success: true,
            message: "Imagen clasificada correctamente",
            data: registro
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al clasificar la imagen",
            error: error.message
        });
    }
}

const clasificarResiduo = (labels) => {
    //convierte a minusculas
    const label = labels.map(label => label.toLowerCase());

    if(label.includes("plastic")||label.includes("bottle")||label.includes("container")){
        return { tipo: "Plástico", contenedor: "Contenedor Amarillo" }
    }

    if(label.includes("paper")||label.includes("cardboard")||label.includes("box")){
        return { tipo: "Papel y Cartón", contenedor: "Contenedor Azul" }
    }

    if(label.includes("glass")||label.includes("bottle")||label.includes("jar")){
        return { tipo: "Vidrio", contenedor: "Contenedor Verde" }
    }

    if(label.includes("food")||label.includes("fruit")||label.includes("vegetable")){
        return { tipo: "Orgánico", contenedor: "Contenedor Marrón" }
    }

    return { tipo: "No reciclable", contenedor: "Contenedor Gris" };
}
