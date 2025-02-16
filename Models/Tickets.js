const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    total: { type: Number, required: true }
});

module.exports = mongoose.model('Ticket', ticketSchema);
