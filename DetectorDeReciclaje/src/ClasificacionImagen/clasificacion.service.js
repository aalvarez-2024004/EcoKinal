import vision from "@google-cloud/vision";

const client = new vision.ImageAnnotatorClient();

export const detectarLabels = async (imagePath) => {
    //se envía la imagen a la API de Google Vision
    const [result] = await client.labelDetection(imagePath);
    //se extraen solo las etiquetas y se convierte en un array
    return result.labelAnnotations.map(label => label.description);
};
