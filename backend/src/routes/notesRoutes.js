import express from "express";
import {getAllNotes, getNote, createNotes, updateNotes, deleteNotes} from "../controllers/noteController.js"

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNote);
router.post("/", createNotes);
router.put("/:id", updateNotes);
router.delete("/:id", deleteNotes);


export default router