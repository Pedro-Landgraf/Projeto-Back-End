const TicketUser = require('../Models/TicketUser');
const connectDB = require('../Middlewares/db.js');

const insertTicketsUsers = async () => {
    try {
        await connectDB();
        const ticketsUsers = [
            { name: 'Ingresso V.I.P.', userId: 1, total: 2 },
            { name: 'Ingresso Camarote', userId: 1, total: 1 },
            { name: 'Ingresso V.I.P.', userId: 2, total: 5 }
        ];
        const result = await TicketUser.insertMany(ticketsUsers);
        console.log('Tickets inserted:', result);
    } catch (err) {
        console.error('Error inserting tickets:', err);
    } finally {
        process.exit(0);
    }
};

insertTicketsUsers();
