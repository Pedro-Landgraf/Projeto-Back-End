const User = require('../Models/Users.js');
const connectDB = require('../Middlewares/db.js')

connectDB()

const insertUsers = async () => {
    const users = [
        {id: 1, name: 'Pedro', email: 'pedrolandgraf@alunos.utfpr.edu.br', password: '12345', isAdmin: true},
        {id: 2, name: 'Joao', email: 'pedrolandgraf@alunos.utfpr.edu.br', password: '54321', isAdmin: false},
        {id: 3, name: 'Jose', email: 'pedrolandgraf@alunos.utfpr.edu.br', password: 'Ze222', isAdmin: false},
        {id: 4, name: 'Maria', email: 'pedrolandgraf@alunos.utfpr.edu.br', password: 'MS@ll', isAdmin: true},
        {id: 5, name: 'Marcos', email: 'pedrolandgraf@alunos.utfpr.edu.br', password: '00000', isAdmin: false}
    ]

    try {
        const result = await User.insertMany(users);
        console.log('Users inserted:', result);
    } catch (err) {
        console.error('Error inserting users:', err);
    }
};

insertUsers();