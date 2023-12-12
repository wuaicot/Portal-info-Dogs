// se establece la configuración de la bdd que utilizaremos para almacenar y recuperar los datos de la aplicación.
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
//para acceder a metodos y propiedades
const fs = require('fs');

const path = require('path');

const {
  DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  dialect: 'postgres',
  protocol: 'postgres',  
  logging: console.log,
  native: false,
});

// Autenticación de la base de datos
sequelize.authenticate()
  .then(() => console.log('Conexión establecida correctamente.'))
  .catch(err => console.error('No se pudo conectar a la base de datos:', err));

//para filtrar los archivos que contienen los modelos de Sequelize y requerirlos dinámicamente.
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) y DataTypes a todos los modelos
modelDefiners.forEach(model => model(sequelize, DataTypes));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

//                            |En sequelize.models están todos los modelos importados como propiedades|
// Para relacionarlos hacemos un destructuring
//*MODELOS:
const { Dogs, Temperaments } = sequelize.models; 

// Aca vendrian las relaciones
//* RELATIONS N-N: 
// Product.hasMany(Reviews);     |através de |tabla intermedia|
Dogs.belongsToMany(Temperaments, {through: 'DogsTemperaments'}); 
Temperaments.belongsToMany(Dogs, {through: 'DogsTemperaments'});

// Sincronización de la base de datos
sequelize.sync()
  .then(() => console.log('Base de datos sincronizada correctamente.'))
  .catch(err => console.error('No se pudo sincronizar la base de datos:', err));

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
