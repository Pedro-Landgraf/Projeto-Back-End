var express = require('express');
const { verifyToken, isAdm, userIsAdmOrHimself } = require('../Middlewares/auth.js');
const router = express.Router();
const ticketsController = require('../Controllers/ticketsController.js');
const usersController = require('../Controllers/usersController.js');
const ticketsUsersController = require('../Controllers/ticketsUsersControllers.js');
const path = require('path');

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/registerUser', usersController.createUser);

router.post('/registerAdm', verifyToken, isAdm, usersController.createUserAdm);

router.get('/getTickets', ticketsController.getTickets);

router.get('/name/:name', ticketsController.getTicketByName);

router.get('/price', ticketsController.getTicketsSortPrice);

router.post('/createTickets', verifyToken, isAdm, ticketsController.createTickets);

router.put('/updateTickets/:id', verifyToken, isAdm, ticketsController.updateTickets);

router.post('/buyTickets', verifyToken, ticketsUsersController.buyTickets);

router.get('/myTickets', verifyToken, ticketsUsersController.seeMyTickets);

router.delete('/deleteTicket/:id', verifyToken, isAdm, ticketsController.deleteTickets);

router.use((req, res) => {
    res.status(404).json({ message: 'URL não encontrada' });
});

module.exports = router;
