const express = require('express');
const multiparty = require('connect-multiparty');
const userController = require('../controllers/user');
//Importa la biblioteca Express.js. Importa la biblioteca connect-multiparty para manejar archivos multipart/form-data. Importa el controlador de usuarios desde el archivo user.controller.js.

const mdUserImg = multiparty({ uploadDir: 'src/uploads/users' });
const app = express.Router();
//Crea un middleware mdUserImg que utiliza connect-multiparty para manejar archivos multipart/form-data y establece la carpeta de uploads en src/uploads/users.
//Crea un objeto app que es una instancia de express.Router.


app.get('/users', userController.index);
app.post('/users/create', mdUserImg, userController.store);
app.post('/users/login', mdUserImg, userController.login);
//Define una ruta GET para obtener la lista de usuarios. La ruta llama al método index del controlador de usuarios.
//Define una ruta POST para crear un nuevo usuario. La ruta utiliza el middleware mdUserImg para manejar archivos multipart/form-data y llama al método store del controlador de usuarios.
//Define una ruta POST para autenticar a un usuario. La ruta utiliza el middleware mdUserImg para manejar archivos multipart/form-data y llama al método login del controlador de usuarios.

//Exporta el objeto app que contiene las rutas definidas.
module.exports = app;