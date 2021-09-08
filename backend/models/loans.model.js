const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const loansSchema = new Schema({
    title: { type: String, required: true, trim: true},
    price: { type: Number, required: true, trim: true},
    duedate: { type: Date, required: true, trim: true},
    interest: { type: String, required: true, trim: true},
}, {
    timestamps: true,
});

const Loans = mongoose.model('Loans', loansSchema);

module.exports = Loans;