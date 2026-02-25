import { Router } from "express";
import multer from "multer";
import{clasificarImagen} from "./clasificacion.controller.js";

const router = Router();
//en la carpeta uploads se guardarán las imagenes temporalmente
const upload = multer({ dest: "uploads/" });

router.post(
    "/clasificar", 
    upload.single("imagen"), 
    clasificarImagen
);

export default router;
