import mongoose from "mongoose";

const savingSchema = mongoose.Schema({
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

const Saving = mongoose.model('Saving', savingSchema);
export default Saving