const Ticket = require('../Models/Ticket');
const connectDB = require('../Middlewares/db.js');

// Conectar ao banco de dados
connectDB();

const getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.status(200).json(tickets);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao obter tickets', error: err.message });
    }
};

const getTicketByName = async (req, res) => {
    const ticketName = req.params.name;
    try {
        const ticket = await Ticket.findOne({ name: ticketName });
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket não encontrado' });
        }
        res.status(200).json(ticket);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao obter ticket', error: err.message });
    }
};

const getTicketsSortPrice = async (req, res) => {
    try {
        const tickets = await Ticket.find().sort({ price: 1 });
        res.status(200).json(tickets);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao obter tickets ordenados por preço', error: err.message });
    }
};

const createTickets = async (req, res) => {
    const ticket = req.body;
    if (!ticket.name || !ticket.price || !ticket.total) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios ou os tipos de parâmetros estão incorretos' });
    }
    try {
        const ticketCreated = await Ticket.create({
            name: ticket.name,
            price: ticket.price,
            total: ticket.total
        });
        res.status(200).json(ticketCreated);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao criar ticket', error: err.message });
    }
};

const updateTickets = async (req, res) => {
    const { id } = req.params;
    const updateFields = req.body;

    try {
        const ticketFound = await Ticket.findById(id);
        if (!ticketFound) {
            return res.status(404).json({ message: 'Ticket não encontrado' });
        }

        // Atualizar apenas os campos permitidos
        const allowedFields = ['name', 'price', 'total'];
        allowedFields.forEach(field => {
            if (field in updateFields) {
                ticketFound[field] = updateFields[field];
            }
        });

        const ticketUpdated = await ticketFound.save();
        res.status(200).json(ticketUpdated);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar ticket', error: err.message });
    }
};

const deleteTickets = async (req, res) => {
    const { id } = req.params;
    try {
        const ticketDeleted = await Ticket.findByIdAndDelete(id);
        if (!ticketDeleted) {
            return res.status(404).json({ message: 'Ticket não encontrado' });
        }
        res.status(200).json({ message: 'Ticket deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao deletar ticket', error: err.message });
    }
};

module.exports = {
    getTickets,
    getTicketByName,
    getTicketsSortPrice,
    createTickets,
    updateTickets,
    deleteTickets
};
