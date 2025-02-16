const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    name: String,
    price: Number,
    total: Number
})

module.exports = mongoose.model('Ticket', ticketSchema);