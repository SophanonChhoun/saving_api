import asyncHandler from "express-async-handler";
import Saving from "../models/savingModel.js";

const saveData = asyncHandler(async (req, res) => {
    const { title, amount, note, date } = req.body

    const saving = new Saving({
        title: title,
        amount: amount,
        user: req.user._id,
        note: note,
        date: date,
    });

    const saveData = saving.save();

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

const deleteSaving = asyncHandler(async (req, res) => {
    const saving = await Saving.findById(req.params.id);
    if(saving) {
        saving.remove();
        res.json({
            message: 'Saving has been deleted'
        });
    } else {
        res.status(404);
        throw new Error(`Saving not found`);
    }
})

const getAllSaving = asyncHandler(async (req, res) => {
    const savings = await Saving.find({ user: req.user._id });
    let totalSaving = 0;
    savings.forEach(saving => {
        totalSaving += saving.amount;
    });
    res.json({
        "savings": savings,
        "totalAmount": totalSaving
    });
});

const getSaving = asyncHandler(async (req, res) => {
    const saving = await Saving.findById(req.params.id);
    if(saving) {
        res.json(saving)
    } else {
        res.status(404);
        throw new Error(`Saving not found`);
    }
});

const updateSaving = asyncHandler(async (req, res) => {
    const saving = await Saving.findById(req.params.id);
    if(saving) {
        saving.title = req.body.title;
        saving.amount = req.body.amount,
        saving.date = req.body.date;
        saving.note = req.body.note;
        const updateSaving = saving.save();
        res.json(updateSaving);
    } else {
        res.status(404);
        throw new Error(`Saving not found`);
    }
});

export {
    saveData,
    deleteSaving,
    getAllSaving,
    getSaving,
    updateSaving
}