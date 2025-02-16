const { tickets } = require('../Data/databaseTickets.js')
const connectDB = require('../Middlewares/db.js')
const Ticket = require('../Models/Tickets.js')

connectDB()

const getTickets = async (res) => {
    try {
        const tickets = await Ticket.find();
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ message: 'Erro' });
    }
}

const getTicketByName = async (req, res) => {
    const ticketName = req.params.name
    
    try {
        const tickets = await Ticket.find({name: ticketName});
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ message: 'Erro' });
    }
}

const getTicketsSortPrice = async (res) => {
    try {
        const tickets = await Ticket.find().sort({price: 1});
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ message: 'Erro' });
    }
}

const createTickets = async (req, res) => {

    const ticket = req.body

    if (!ticket.name || !ticket.price || !ticket.total) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios ou os tipos de parâmetros estão incorretos' });
    }

    else{
        try{
            const ticketCreated = await Ticket.insertOne ({name: ticket.name, price: ticket.price, total: ticket.total})
            ticketCreated.save()
            res.status(200).json(ticketCreated)
        }
        catch(err){
            res.status(500).json({ message: 'Erro' });
        }
    }
}

const updateTickets = async (req, res) => {
    const ticket = req.body
    try {
        const ticketFound = await Ticket.find({name: ticket.name});
    } catch (err) {
        res.status(500).json({ message: 'Erro' });
    }

    const properties = ['name', 'price', 'total']
    Object.keys(req.body).forEach(key => {
        if(properties.includes(key)) {
            if(key === 'price') {
                if(typeof req.body[key] === 'number'){
                    ticketFound[key] = req.body[key]
                }
            }
            else {
                ticketFound[key] = req.body[key]
            }
        }
    })

    const ticketFound = await Ticket.updateOne({name: ticketFound.name, price: ticketFound.price, total: ticketFound.total})
    ticketFound.save()
    res.status(200).json(ticketFound)
}

const deleteTickets = async (req,res) => {
    const ticketName = req.body
    try {
        const ticket = await Ticket.deleteOne({name: ticketName.name});
        res.status(200).json(ticket)
    } catch (err) {
        res.status(500).json({ message: 'Erro' });
    }
}

module.exports = {
    getTickets,
    getTicketByName,
    getTicketsSortPrice,
    createTickets,
    updateTickets,
    deleteTickets
}
