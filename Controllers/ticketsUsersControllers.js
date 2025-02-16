const { ticketsUsers } = require('../Data/databaseTicketsUsers.js')
const connectDB = require('../Middlewares/db.js')
const TicketUsers = require('../Models/Tickets-Users.js')

connectDB()

const buyTickets = async (name, idUser, total) => {
    try {
        let ticket = await TicketUsers.find({name: name, idUser: idUser});
        if(!ticket){
            await TicketUsers.insertOne ({name: name, idUser: idUser, total: total})
        }
        else{
            ticket.total += total
            await TicketUsers.updateOne({name: ticket.name, idUser: ticket.idUser, total: ticket.total})
        }
        ticket.save()
        res.json(ticket);
    } catch (err) {
        res.status(500).json({ message: 'Erro' });
    }
}

const seeMyTickets = async (idUser) => {
    try {
        const tickets = await TicketUsers.find({idUser: idUser});
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ message: 'Erro' });
    }
} 

module.exports = {
    buyTickets,
    seeMyTickets
}