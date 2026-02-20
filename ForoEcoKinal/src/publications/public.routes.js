import { Router } from "express";
import {
    createPublication,
    getPublications,
    updatePublication,
    deletePublication,
} from "./publi.controller.js";
import { verifyToken } from "../../middlewares/validate-JWT.js";
import { uploadPublicationImage } from "../../middlewares/file-uploader.js";
import { cleanUploaderFileOnFinish } from "../../middlewares/delete-file-on-error.js";

const router = Router();

router.post(
    "/create",
    verifyToken,
    uploadPublicationImage.single("photo"),
    cleanUploaderFileOnFinish,
    createPublication,
);

router.get("/listar", verifyToken, getPublications);

router.put(
    "/update/:id",
    verifyToken,
    uploadPublicationImage.single("photo"),
    updatePublication,
);

router.delete("/delete/:id", verifyToken, deletePublication);

export default router;
