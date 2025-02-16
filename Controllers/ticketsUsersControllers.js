const TicketUser = require('../Models/TicketUser');
const Ticket = require('../Models/Ticket');
const connectDB = require('../Middlewares/db.js');

connectDB();

const buyTickets = async (req, res) => {
    const { name, total } = req.body;
    const userId = req.user.id;

    try {
        const ticket = await Ticket.findOne({ name });
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket não encontrado' });
        }

        if (ticket.total < total) {
            return res.status(400).json({ message: 'Quantidade de tickets insuficiente' });
        }

        let ticketUser = await TicketUser.findOne({ name, userId });
        if (!ticketUser) {
            ticketUser = await TicketUser.create({
                name,
                userId,
                total
            });
        } else {
            ticketUser.total += total;
            await ticketUser.save();
        }

        ticket.total -= total;
        await ticket.save();

        res.status(200).json({ message: 'Tickets comprados com sucesso', ticketUser });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao comprar tickets', error: err.message });
    }
};

const seeMyTickets = async (req, res) => {
    const userId = req.user.id; 

    try {
        const tickets = await TicketUser.find({ userId });
        res.status(200).json(tickets);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao obter seus tickets', error: err.message });
    }
};

module.exports = {
    buyTickets,
    seeMyTickets
};
