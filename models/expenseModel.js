import mongoose from "mongoose";

const expenseSchema = mongoose.Schema({
    amount: {
        type: Number, 
        default: 0,
    }, 
    title: {
        type: String,
        required: true,
    },
    note: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;