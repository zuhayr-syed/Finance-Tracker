const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const expensesSchema = new Schema({
    title: { type: String, required: true, trim: true},
    price: { type: Number, required: true, trim: true},
    duedate: { type: Date, required: true, trim: true},
    period: { type: String, required: true, trim: true, minlength: 3},
}, {
    timestamps: true, 
});

const Expenses = mongoose.model('Expenses', expensesSchema);

module.exports = Expenses;