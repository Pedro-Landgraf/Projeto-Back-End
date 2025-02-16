const express = require('express')

const {verifyToken, isAdm} = require('../Middlewares/auth.js')
const router = express.Router()

//Chamada de funções do usersController
const ticketsController = require('../Controllers/ticketsController.js')

router.get('/', ticketsController.getTickets)
router.get('/id/:id', ticketsController.getTicketById)
router.get('/idUser/:idUser', ticketsController.getTicketByUser)
router.get('/name/:name', ticketsController.getTicketByName)
router.get('/type/:type', ticketsController.getTicketByType)
router.get('/price', ticketsController.getTicketsSortPrice)
router.get('/expiration/:expiration', ticketsController.getTicketByExpiration)

router.post('/createTickets', verifyToken, isAdm, ticketsController.createTickets)

router.put('/:id', verifyToken, isAdm, ticketsController.updateTickets)

//router.put('/buyTickets/:type', verifyToken, ticketsController.buyTickets)

router.delete('/:id', verifyToken, isAdm, ticketsController.deleteTickets)

module.exports = router