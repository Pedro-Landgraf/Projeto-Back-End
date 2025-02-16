const User = require('../Models/Users.js');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    const newUser = req.body;
    if (!newUser.name || !newUser.email || !newUser.password) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }
    try {
        const userCreated = await User.create({
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            isAdmin: false
        });
        res.status(200).json(userCreated);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao criar usuário', error: err.message });
    }
};

const createUserAdm = async (req, res) => {
    const newUser = req.body;
    if (!newUser.name || !newUser.email || !newUser.password) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }
    try {
        const userCreated = await User.create({
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            isAdmin: true
        });
        res.status(200).json(userCreated);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao criar administrador', error: err.message });
    }
};

const verifyUser = async (req, res) => {
    res.render('login', { erro: '' });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userLogin = await User.findOne({ email, password });
        if (!userLogin) {
            return res.render('login', { erro: 'Usuário ou senha inválida, tente novamente' });
        }
        const token = jwt.sign({ id: userLogin._id, isAdmin: userLogin.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie("token", token, { httpOnly: true });
        res.redirect('/getTickets');
    } catch (err) {
        res.render('login', { erro: 'Erro ao verificar usuário' });
    }
};

module.exports = {
    createUser,
    createUserAdm,
    verifyUser,
    loginUser
};
