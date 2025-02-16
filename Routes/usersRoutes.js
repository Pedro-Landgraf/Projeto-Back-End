const express = require('express')

//Chamada de funções do usersController
const usersController = require('../Controllers/usersController.js')

//Importação dos middlewares de autenticação
//VerifyToken é usado para verificar o Token de Login
//isAdm analisa se o token do usuário logado tem permissão ou não de administrador
//userisAdmOrHimself permite ações apenas para o próprio usuário ou administradores.
const {verifyToken, isAdm, userIsAdmOrHimself} = require('../Middlewares/auth.js')
const router = express.Router()

//Rotas get, um para retornar todos os usuários do sistema e outro para retornar um especifico pelo id no req.params
router.get('/getUsers', usersController.getUsers)
router.get('/getUser/:id', usersController.getUserById)



//Rotas post, um para registrar usuário, outro para registrar administrador (apenas administradores podem realizar) 
//e outro de login que retorna o token
router.post('/registerUser', usersController.createUser)
router.post('/registerAdm', verifyToken, isAdm, usersController.createUserAdm)
//router.post('/login', usersController.verifyUser)

//Rotas put para modificar as informações do usuário, sendo que um para modificar o próprio usuário
//outro apenas os administradores podem modificar.
router.put('/updateUser', verifyToken, userIsAdmOrHimself, usersController.updateUser)
router.put('/updateAdm', verifyToken, isAdm, usersController.updateUserAdm)

//Rota delete que permite a deletar usuário pelo req.params caso o usuário autenticado seja administrador. 
router.delete('/deleteUser/:id', verifyToken, isAdm, usersController.deleteUser)

module.exports = router