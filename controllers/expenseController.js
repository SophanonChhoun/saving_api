import asyncHandler from "express-async-handler";
import Expense from "../models/expenseModel.js";

const saveData = asyncHandler(async (req, res) => {
    const { title, amount, note, date } = req.body

    const expense = new Expense({
        title: title,
        amount: amount,
        user: req.user._id,
        note: note,
        date: date,
    });

    const saveData = expense.save();

    if(saveData) {
        res.json({
            "message": "data saved."
        });
    }else{
        res.status(400);
        res.json({
            "message": "cannot save data."
        })
    }
});

const deleteExpense = asyncHandler(async (req, res) => {
    const expense = await Expense.findById(req.params.id);
    if(expense) {
        expense.remove();
        res.json({
            message: 'Expense has been deleted'
        });
    } else {
        res.status(404);
        throw new Error(`Expense not found`);
    }
})

const getAllExpense = asyncHandler(async (req, res) => {
    const expenses = await Expense.find({ user: req.user._id });
    let totalExpense = 0;
    expenses.forEach(expense => {
        totalExpense += expense.amount;
    });
    res.json({
        "expense": expenses,
        "totalAmount": totalExpense
    });
});

const getExpense = asyncHandler(async (req, res) => {
    const expense = await Expense.findById(req.params.id);
    if(expense) {
        res.json(expense)
    } else {
        res.status(404);
        throw new Error(`Expense not found`);
    }
});

const updateExpense = asyncHandler(async (req, res) => {
    const expense = await Expense.findById(req.params.id);
    if(expense) {
        expense.title = req.body.title;
        expense.amount = req.body.amount,
        expense.date = req.body.date;
        expense.note = req.body.note;
        const updateExpense = expense.save();
        res.json(updateExpense);
    } else {
        res.status(404);
        throw new Error(`Saving not found`);
    }
});

export {
    saveData,
    deleteExpense,
    getAllExpense,
    getExpense,
    updateExpense
}