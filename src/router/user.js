const express = require('express');
const multiparty = require('connect-multiparty');
const userController = require('../controllers/user');
//Importa la biblioteca Express.js. Importa la biblioteca connect-multiparty para manejar archivos multipart/form-data. Importa el controlador de usuarios desde el archivo user.controller.js.

const mdUserImg = multiparty({ uploadDir: 'src/uploads/users' });
const app = express.Router();
//Crea un middleware mdUserImg que utiliza connect-multiparty para manejar archivos multipart/form-data y establece la carpeta de uploads en src/uploads/users.
//Crea un objeto app que es una instancia de express.Router.


app.get('/users', userController.index);
app.get('/users/getById', userController.getById);
app.get('/users/getByHoroscope', userController.getByHoroscope);
app.get('/users/getByCompatibilidad', userController.getByCompatibilidad);
app.post('/users/create', mdUserImg, userController.store);
app.post('/users/login', mdUserImg, userController.login);
app.patch('/users/update', mdUserImg, userController.update);
app.delete('/users/delete', userController.deleteUser);
//Cuando se realiza una solicitud GET a /users, se ejecuta el método index del userController. Este método generalmente se utiliza para obtener una lista de todos los usuarios.
//Cuando se realiza una solicitud GET a /users/getById, se ejecuta el método getById del userController. Este método generalmente se utiliza para obtener un usuario específico por su ID.
//Cuando se realiza una solicitud GET a /users/getByHoroscope, se ejecuta el método getByHoroscope del userController. Este método generalmente se utiliza para obtener el horosocpo de un usuario específico por su ID.
//Cuando se realiza una solicitud GET a /users/getByCompatibilidad, se ejecuta el método getByCompatibilidad del userController. Este método generalmente se utiliza para obtener la compatibilidad un usuario específico por su ID.
//Cuando se realiza una solicitud POST a /users/create, primero se ejecuta el middleware mdUserImg (maneja la carga de imágenes de usuario), y luego se ejecuta el método store del userController. Este método generalmente se utiliza para crear un nuevo usuario.
//Cuando se realiza una solicitud POST a /users/login, primero se ejecuta el middleware mdUserImg, y luego se ejecuta el método login del userController. Este método generalmente se utiliza para autenticar a un usuario y iniciar su sesión.
//Cuando se realiza una solicitud PATCH a /users/update, primero se ejecuta el middleware mdUserImg, y luego se ejecuta el método update del userController. Este método generalmente se utiliza para actualizar la información de un usuario existente.
//Cuando se realiza una solicitud DELETE a /users/delete, se ejecuta el método deleteUser del userController. Este método generalmente se utiliza para eliminar un usuario.


//Exporta el objeto app que contiene las rutas definidas.
module.exports = app;