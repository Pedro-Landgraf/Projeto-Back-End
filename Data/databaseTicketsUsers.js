const TicketUser = require('../Models/Tickets-Users');
const connectDB = require('../Middlewares/db.js')

connectDB()

const insertTicketsUsers = async () => {
    const ticketsUsers = [
        {name: 'Ingresso V.I.P.', id: 1, total: 2},
        {name: 'Ingresso Camarote', id: 1, total: 1},
        {name: 'Ingresso V.I.P.', id: 2, total: 5},
    ]

    try {
        const result = await TicketUser.insertMany(ticketsUsers);
        console.log('Tickets inserted:', result);
    } catch (err) {
        console.error('Error inserting tickets:', err);
    }
};

insertTicketsUsers()