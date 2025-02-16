const mongoose = require('mongoose');

const ticketUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userId: { type: Number, required: true },
    total: { type: Number, required: true }
});

module.exports = mongoose.model('TicketUser', ticketUserSchema);
