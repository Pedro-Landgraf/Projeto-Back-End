const { users, getNewId } = require('../Data/databaseUsers.js')
const jwt = require('jsonwebtoken')
const connectDB = require('../Middlewares/db.js')
const User = require('../Models/Users.js')

connectDB()

const createUser = async (req, res) => {
    const newUser =  req.body
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


const createUserAdm = async (req, res) => {
    
    const newUser =  req.body

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

const verifyUser = async(req, res) => {
    const {email, password} = req.body

    const userLogin = User.find({email: email, password: password})

    if(!userLogin) {
        return res.status(401).json({ message: 'Usuário ou senha inválida, tente novamente' });
    }

    else{
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
