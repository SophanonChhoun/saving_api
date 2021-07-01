import express from "express";
import {
    saveData,
    deleteSaving,
    updateSaving,
    getAllSaving,
    getSaving
} from "../controllers/savingController.js";
import {protect} from "../middleware/authMiddleware.js";

var router = express.Router();
router.route('').get(protect, getAllSaving).post(protect, saveData);
router.route('/:id')
    .get(protect, getSaving)
    .put(protect, updateSaving)
    .delete(protect, deleteSaving);

export default router;