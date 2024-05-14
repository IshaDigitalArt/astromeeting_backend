const express = require('express');
const cors = require('cors');
const dbConnection = require('./config/db');
//Importa la biblioteca Express.js para crear una aplicación web. Importa la biblioteca CORS para habilitar el acceso a la API desde diferentes orígenes.
//Importa la configuración de la conexión a la base de datos desde el archivo db.js.

//Variables de entorno
//Importa las variables de entorno API_VERSION y API_NAME que contienen la versión y el nombre de la API, respectivamente.
const { API_VERSION, API_NAME } = process.env;

//Creación de la aplicación
//Crea una instancia de la aplicación Express.js.
const app = express();

const http = require('http');
const httpServer = http.createServer(app);
//Importa la biblioteca HTTP para crear un servidor HTTP. Crea un servidor HTTP que utiliza la aplicación Express.js.

// Importa la biblioteca Socket.IO para crear un servidor de WebSocket y lo configura para utilizar el servidor HTTP creado anteriormente.
const io = require('socket.io')(httpServer, {
    cors: {
        origin: 'http://localhost:4200'
    }
});

//Importar rutas
const userRoutes = require('./router/user');
const messagesRoutes = require('./router/message');
//Importa las rutas de la API de usuarios desde el archivo user.router.js.  Importa las rutas de la API de mensajes desde el archivo message.router.js.

//Configuración de la aplicación
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('src/uploads'));
app.use(cors());
//Habilita el parsing de formularios URL-encoded.
//Habilita el parsing de JSON en las solicitudes.
//Habilita el servicio de archivos estáticos en la carpeta src/uploads.
//Habilita el acceso CORS a la API.

//Define un middleware que asigna la instancia de Socket.IO y la conexión a la base de datos a la solicitud.
app.use((req, res, next) => {
    req.io = io;
    req.con = dbConnection;
    next();
});

//Exponer rutas
const basePath = `/${API_NAME}/${API_VERSION}`;
app.use(basePath, userRoutes);
app.use(basePath, messagesRoutes);
//Registra las rutas de la API de usuarios en la aplicación.
//Registra las rutas de la API de mensajes en la aplicación.

// app.get('/',(req,res)=>{
//     res.status(200).send('Ok');
// })

//Soket.io
io.on('connect', (socket) => { //Define un evento de conexión a Socket.IO que se activa cuando un cliente se conecta.
    socket.on('typing', (data) => { //Define un evento de typing que se activa cuando un cliente envía un mensaje de typing.
        io.emit('listening', data);
    });
    socket.on('disconnect', () => { //Define un evento de desconexión que se activa cuando un cliente se desconecta.
        console.log('Usuario no conectado');
    });
});

//Exporta el servidor HTTP creado para que pueda ser utilizado en otros archivos.
module.exports = httpServer;