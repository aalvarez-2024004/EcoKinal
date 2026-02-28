'use strict'
import axios from "axios";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

export const detectarLabels = async (imagePath, mimeType = "image/jpeg") => {
    try {
        //Valida que la imagen exista antes de leerla
        if (!fs.existsSync(imagePath)) {
            throw new Error(`No se encontró la imagen en la ruta: ${imagePath}`);
        }

        //la imagen se convierte a base64 para enviarlo a la API
        const image = fs.readFileSync(imagePath);
        const base64Image = image.toString("base64");

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "meta-llama/llama-3.2-11b-vision-instruct",
                messages: [
                    {
                        role: "user",
                        content: [
                            {
                                type: "image_url",
                                image_url: {
                                    url: `data:${mimeType};base64,${base64Image}`
                                }
                            },
                            {
                                //Se pide que se analize la imagen
                                type: "text",
                                text: "Analyze this image and identify what type of waste or garbage is shown. Respond with only a comma-separated list of labels in English, such as: plastic, glass, metal, cardboard, food, paper, bottle, can, fruit, vegetable. Only the labels, nothing else."
                            }
                        ]
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                },
                timeout: 60000
            }
        );

        const text = response.data.choices[0].message.content;
        //aqui se convierte en un array de todos los labels
        const labels = text.split(",").map(l => l.trim().toLowerCase()).filter(Boolean);

        console.log("Labels detectados:", labels);
        return labels;

    } catch (error) {
        throw new Error("Error al detectar labels con OpenRouter");
    }
};