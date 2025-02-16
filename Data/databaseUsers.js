const connectDB = require('../Middlewares/db.js');
const User = require('../Models/Users.js');

let currentId = 0;

const getNewId = () => {
    currentId += 1;
    return currentId;
};

const insertUsers = async () => {
    try {
        await connectDB();
        const users = [
            { id: getNewId(), name: 'Pedro', email: 'pedrolandgraf@alunos.utfpr.edu.br', password: '12345', isAdmin: true },
            { id: getNewId(), name: 'Joao', email: 'joao@alunos.utfpr.edu.br', password: '54321', isAdmin: false },
            { id: getNewId(), name: 'Jose', email: 'jose@alunos.utfpr.edu.br', password: 'Ze222', isAdmin: false },
            { id: getNewId(), name: 'Maria', email: 'maria@alunos.utfpr.edu.br', password: 'MS@ll', isAdmin: true },
            { id: getNewId(), name: 'Marcos', email: 'marcos@alunos.utfpr.edu.br', password: '00000', isAdmin: false }
        ];
        const result = await User.insertMany(users);
        console.log('Users inserted:', result);
    } catch (err) {
        console.error('Error inserting users:', err);
    } finally {
        process.exit(0);
    }
};

insertUsers();

module.exports = {
    getNewId
};
