const mongoose = require('mongoose');

const ticketUserSchema = new mongoose.Schema({
    name: String,
    userId: Number,
    total: Number
})

module.exports = mongoose.model('Ticket-User', ticketUserSchema);