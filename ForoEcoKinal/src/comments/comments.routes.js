import { Router } from "express";
import { addComment, updateComment, deleteComment, getCommentsByPublication } from "./comments.controller.js";
import { verifyToken } from "../../middlewares/validate-JWT.js";

const router = Router();

router.post("/add", verifyToken, addComment);
router.get("/get/:publicationId", getCommentsByPublication);
router.put("/update/:id", verifyToken, updateComment);
router.delete("/delete/:id", verifyToken, deleteComment);

export default router;