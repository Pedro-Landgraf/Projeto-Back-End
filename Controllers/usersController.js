const { users, getNewId } = require('../Data/databaseUsers.js')
const jwt = require('jsonwebtoken')
const connectDB = require('../Middlewares/db.js')
const User = require('../Models/Users.js')

connectDB()


//Função para criar usuário
const createUser = async (req, res) => {

    //Criação de variável com as informações passada pelo body
    const newUser =  req.body

    //Se o body não conter name, email, user e password, será chamado o erro 400.
    if (!newUser.name || !newUser.email || !newUser.password) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    else{
        try{
        const userCreated = await User.insertOne ({id: getNewId(), name: newUser.name, email: newUser.email, password: newUser.password, isAdmin: false})
        userCreated.save()
        res.status(200).json(userCreated)
        }
        catch(err){
            res.status(500).json({ message: 'Erro' });
        }
    }
}


//Função para criar administrador
const createUserAdm = async (req, res) => {
    
    //Criação de variável com as informações passada pelo body
    const newUser =  req.body

    //Se o body não conter name, email, user e password, será chamado o erro 400.
    if (!newUser.name || !newUser.email || !newUser.password) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    else{
        try{
        const userCreated = await User.insertOne ({id: getNewId(), name: newUser.name, email: newUser.email, password: newUser.password, isAdmin: false})
        userCreated.save()
        res.status(200).json(userCreated)
        }
        catch(err){
            res.status(500).json({ message: 'Erro' });
        }
    }
}

//Função de login que retorna um token
const verifyUser = async(req, res) => {
    //As informações de autenticação são passada pelo body
    const {email, password} = req.body

    //Será procurado o usuário com o mesmo nome e senha no vetor
    const userLogin = User.find({email: email, password: password})

    //Caso não encontre, retornará erro 401
    if(!userLogin) {
        return res.status(401).json({ message: 'Usuário ou senha inválida, tente novamente' });
    }

    else{
        //Será gerado um jwt token que contém 2 informações, o ID do usuário e se ele é ADM
        //Criptografia feita com a string atribuida do JWT_SECRET do arquivo .env
        //O token terá validade de até 1 hora
        const token = jwt.sign({id: userLogin.id, isAdm: userLogin.isAdm}, process.env.JWT_SECRET, {expiresIn: '1 hr'})
        res.cookie("token", token, {httpOnly: true})

        res.status(200).json({message: 'Login funcionou', token})
    }
}

module.exports = {
    createUser,
    createUserAdm,
    verifyUser,
}