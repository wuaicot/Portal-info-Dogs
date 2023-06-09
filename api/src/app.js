//creamos el servidor 
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');//tambien app.use(express.json());
const routes = require('./routes/index.js');
const cors = require ('cors');

require('./db.js');

////////////////////////////////////////*  SERVER: 

const server = express();

server.name = 'API';

//////////////////////////////////////*   MIDDLEWARE: 
// .use para aplicar un middleware a todas las peticiones que LLEGAN AL servidor.
// El middleware es bodyParser que analiza el cuerpo de las peticiones y lo convierte en un objeto JavaScript accesible desde req.body
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use(cors()); //se puede permitir o restringir el acceso a la API desde otros dominios o servidores (cors es un middleware)
server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
