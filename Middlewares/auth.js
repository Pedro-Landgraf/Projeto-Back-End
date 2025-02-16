const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(403).json({ message: 'Token não fornecido' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token inválido' });
    }
};

const isAdm = (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Permissão negada' });
    }
    next();
};

const userIsAdmOrHimself = (req, res, next) => {
    if (req.user.isAdmin || req.user.id === parseInt(req.params.id)) {
        next();
    } else {
        res.status(403).json({ message: 'Permissão negada' });
    }
};

module.exports = {
    verifyToken,
    isAdm,
    userIsAdmOrHimself
};
