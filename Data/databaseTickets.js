const Ticket = require('../Models/Ticket'); 
const connectDB = require('../Middlewares/db.js');

const insertTickets = async () => {
    try {
        await connectDB();
        const tickets = [
            { name: 'Ingresso V.I.P.', price: 200.00, total: 25 },
            { name: 'Ingresso Camarote', price: 100.00, total: 50 },
            { name: 'Ingresso Comum', price: 50.00, total: 100 }
        ];
        const result = await Ticket.insertMany(tickets);
        console.log('Tickets inserted:', result);
    } catch (err) {
        console.error('Error inserting tickets:', err);
    } finally {
        process.exit(0);
    }
};

insertTickets();
