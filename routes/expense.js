import express from "express";
import {
    saveData,
    deleteExpense,
    updateExpense,
    getAllExpense,
    getExpense,
} from "../controllers/expenseController.js";
import {protect} from "../middleware/authMiddleware.js";

var router = express.Router();
router.route('').get(protect, getAllExpense).post(protect, saveData);
router.route('/:id')
    .get(protect, getExpense)
    .put(protect, updateExpense)
    .delete(protect, deleteExpense);

export default router;