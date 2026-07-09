import express from "express";
import { getAllNotes, getNote, createNotes, updateNotes, deleteNotes } from "../controllers/noteController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getAllNotes);
router.get("/:id", getNote);
router.post("/", createNotes);
router.put("/:id", updateNotes);
router.delete("/:id", deleteNotes);

export default router