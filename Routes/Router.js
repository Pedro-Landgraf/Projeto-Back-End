var express = require('express');
const {verifyToken, isAdm, userIsAdmOrHimself} = require('../Middlewares/auth.js')
const router = express.Router()
const ticketsController = require('../Controllers/ticketsController.js')
const usersController = require('../Controllers/usersController.js')
const ticketsUsersController = require('../Controllers/ticketsUsersControllers.js')

router.get('/', usersController.verifyUser, res.render('login'))

router.post('/registerUser', usersController.createUser)
router.post('/registerAdm', verifyToken, isAdm, usersController.createUserAdm)

router.get('/getTickets', ticketsController.getTickets)
router.get('/name/:name', ticketsController.getTicketByName)
router.get('/price', ticketsController.getTicketsSortPrice)

router.post('/createTickets', verifyToken, isAdm, ticketsController.createTickets)

router.post('/updateTickets/:id', verifyToken, isAdm, ticketsController.updateTickets)

router.post('/buyTickets/:type', verifyToken, ticketsUsersController.buyTickets)

router.get('/myTickets/:type', verifyToken, ticketsUsersController.seeMyTickets)

router.post('/deleteTicket/:id', verifyToken, isAdm, ticketsController.deleteTickets)

module.exports = router;