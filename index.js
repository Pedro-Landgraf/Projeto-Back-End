//Importação de frameworks e funções no projeto, uso de dotenv para o auth.
require('dotenv').config();
const express = require('express')
const connectDB = require('./Middlewares/db.js')
const {urlNotValid} = require('./Middlewares/auth.js')
const routes = require('./Routes/Routes.js')

var mustacheExpress = require("mustache-express");
var engine = mustacheExpress();
app.engine("mustache", engine);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');

const app = express()

app.use(express.json())

connectDB()

//O servidor rodará na porta 4000, tendo 3 rotas principais, /users, /countries, /cities.
app.use('/', routes)


//Chamada de middleware do arquivo auth.js para caso não encontre a rota
app.use(urlNotValid)

app.listen(4000, () => console.log("Servidor rodando na porta 4000"))