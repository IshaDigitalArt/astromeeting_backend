//Importa la biblioteca mysql que se utiliza para interactuar con la base de datos MySQL.
const mysql = require('mysql'); 
require('dotenv').config(); //Importa la biblioteca dotenv que se utiliza para cargar variables de entorno desde un archivo .env.

//Extrae las variables de entorno DB_HOST, DB_USER, DB_PASSWORD y DB_NAME desde el objeto process.env. Estas variables se utilizan para configurar la conexión a la base de datos.
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

//Crea una conexión a la base de datos utilizando la biblioteca mysql. La conexión se configura con las variables de entorno extraídas anteriormente.
const connection = mysql.createConnection({
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD
});

//Exporta la conexión a la base de datos como un módulo que puede ser importado por otros archivos.
module.exports = connection;