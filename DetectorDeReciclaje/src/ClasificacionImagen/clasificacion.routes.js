import { Router } from "express";
import multer from "multer";
import{clasificarImagen} from "./clasificacion.controller.js";
import { verifyToken } from "../../middlewares/validate-JWT.js"

const router = Router();
//en la carpeta uploads se guardarán las imagenes temporalmente
const upload = multer({
    dest: "uploads/",
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Solo se permiten imágenes"), false);
        }
    }
});

router.post(
    "/clasificar", 
    verifyToken,
    upload.single("imagen"), 
    clasificarImagen
);

export default router;
