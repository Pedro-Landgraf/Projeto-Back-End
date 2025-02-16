const jwt = require('jsonwebtoken');
const { users } = require('../Data/databaseUsers');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Acesso negado' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido!' });
        }
        const user = users.find(u => u.id === decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }
        req.user = user;
        next();
    });
};

const isAdm = (req, res, next) => {
    verifyToken(req, res, () => {
        if (!req.user || !req.user.isAdmin) {
            return res.status(403).json({ message: 'Acesso negado: apenas administradores podem realizar a ação' });
        }
        next();
    });
};

const userIsAdmOrHimself = (req, res, next) => {
    verifyToken(req, res, () => {
        const idUserToBeUpdated = parseInt(req.params.id, 10); // Supondo que o ID seja passado como parâmetro na URL
        const idUserMakingUpdate = req.user.id;
        const isAdm = req.user.isAdmin;
        if (!isAdm && idUserToBeUpdated !== idUserMakingUpdate) {
            return res.status(403).json({ message: 'Acesso negado: apenas administradores podem realizar a ação' });
        }
        next();
    });
};

const urlNotValid = (req, res, next) => {
    res.status(404).json({ message: 'Rota não existente' });
};

module.exports = { verifyToken, isAdm, userIsAdmOrHimself, urlNotValid };
