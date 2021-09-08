const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tuitionSchema = new Schema({
    title: { type: String, required: true, trim: true},
    price: { type: Number, required: true, trim: true},
    duedate: { type: Date, required: true, trim: true},
}, {
    timestamps: true,
});

const Tuition = mongoose.model('Tuition', tuitionSchema);

module.exports = Tuition;