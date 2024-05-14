const express = require('express');
const messageController = require('../controllers/message');
const { userAuthenticated } = require('../middleware/auth');
//Importa la biblioteca Express.js.  Importa el controlador de mensajes desde el archivo message.controller.js. Importa el middleware de autenticación de usuarios desde el archivo auth.js.

//Crea un objeto app que es una instancia de express.Router.
const app = express.Router();

app.get('/messages', userAuthenticated, messageController.index);
app.post('/messages/create', userAuthenticated, messageController.store);
app.delete('/messages/:id', userAuthenticated, messageController.destroy);
//Define una ruta GET para obtener la lista de mensajes. La ruta utiliza el middleware userAuthenticated para verificar si el usuario está autenticado, y luego llama al método index del controlador de mensajes.
//Define una ruta POST para crear un nuevo mensaje. La ruta utiliza el middleware userAuthenticated para verificar si el usuario está autenticado, y luego llama al método store del controlador de mensajes.
// Define una ruta DELETE para eliminar un mensaje por su ID. La ruta utiliza el middleware userAuthenticated para verificar si el usuario está autenticado, y luego llama al método destroy del controlador de mensajes.

//Exporta el objeto app que contiene las rutas definidas.
module.exports = app;