//Importa el modelo Message desde el archivo message.js en la carpeta models.
const Message = require('../models/message');

//Exporta un objeto que contiene los métodos del controlador.
module.exports = {
    //Define el método index que se encarga de obtener la lista de mensajes. Llama al método _getMessages para obtener la lista de mensajes y devuelve la respuesta.
    index: (req, res) => {
        _getMessages(req, res);
    },

    //Define el método store que se encarga de crear un nuevo mensaje. Utiliza el método create del modelo Message para crear el mensaje y devuelve una respuesta según el resultado de la operación.
    store: (req, res) => {
        Message.create(req.con, req.body, (error) => {
            if (error) {
                //console.log(error)
                res.status(500).send({ response: 'Ha ocurrido un error creando el mensaje' });
            } else {
                req.query = { compatibilidad: req.body.compatibilidad } //solución fea pero válida
                _getMessages(req, res);
            }
        });
    },

    //Define el método destroy que se encarga de eliminar un mensaje. Utiliza el método destroy del modelo Message para eliminar el mensaje y devuelve una respuesta según el resultado de la operación.
    destroy: (req, res) => {
        const { id } = req.params;
        Message.destroy(req.con, id, (error) => {
          //console.log(error);
            if (error) {
                res.status(500).send({ response: 'Ha ocurrido un error eliminando el mensaje' });
            } else {
                _getMessages(req, res);
            }
        });
    },

}

//Define una función privada _getMessages que se encarga de obtener la lista de mensajes. Utiliza el método get del modelo Message para obtener la lista de mensajes y devuelve una respuesta según el resultado de la operación. También emite un evento messages a través de Socket.IO para notificar a los clientes de la actualización de la lista de mensajes.
function _getMessages(req, res) {
    console.log(req.query);
    Message.get(req.con, req.query, (error, rows) => {
        //console.log(error);
        if (error) {
            res.status(500).send({ response: 'Ha ocurrido un error listando los mensajes' });
        } else {
            const { io } = req;
            io.emit('messages', rows);
            res.status(200).send({ response: rows });
        }
    })
}