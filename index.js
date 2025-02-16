require('dotenv').config();
const express = require('express');
const connectDB = require('./Middlewares/db.js');
const routes = require('./Routes/Routes.js');
const path = require('path');
const mustacheExpress = require("mustache-express");
const cookieParser = require('cookie-parser');

const app = express();

// Configuração do mecanismo de visualização Mustache
var engine = mustacheExpress();
app.engine("mustache", engine);
app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'mustache');

// Middlewares
app.use(express.json());
app.use(cookieParser());
connectDB();
app.use('/', routes);

app.listen(4000, () => console.log("Servidor rodando na porta 4000"));
