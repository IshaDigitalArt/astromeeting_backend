//Exporta un objeto que contiene los métodos del modelo Message.
module.exports = {
    //Define el método get que se encarga de obtener la lista de mensajes. Utiliza la conexión con para ejecutar una consulta SQL que selecciona todos los campos de la tabla messages y los campos firstName y lastName de la tabla users, utilizando una inner join para relacionar las dos tablas. La consulta se ordena por la fecha de creación de los mensajes en orden ascendente. El método devuelve los resultados de la consulta a través del callback.
    get: (con, callback) => {
        con.query(`
        SELECT content, messages.id as id, 
        userId, date, firstName, lastName 
        FROM messages INNER JOIN users 
        ON messages.userId = users.id ORDER BY date ASC;`, callback); //ordena los mensajes para que el último se vea abajo del todo
    },

    //Define el método getById que se encarga de obtener un mensaje por su ID. Utiliza la conexión con para ejecutar una consulta SQL que selecciona todos los campos de la tabla messages donde el ID coincide con el parámetro id. El método devuelve los resultados de la consulta a través del callback.
    getById: (con, id, callback) => {
        con.query(`SELECT * FROM messages WHERE id= ${id}`, callback);
    },

    //Define el método create que se encarga de crear un nuevo mensaje. Utiliza la conexión con para ejecutar una consulta SQL que inserta un nuevo registro en la tabla messages con los campos content y userId establecidos según los valores del objeto data. El método devuelve los resultados de la consulta a través del callback.
    create: (con, data, callback) => {
        con.query(`
        INSERT INTO messages SET
        content = '${data.content}',
        userId = '${data.userId}'
        `, callback);
    },

    //Define el método destroy que se encarga de eliminar un mensaje por su ID. Utiliza la conexión con para ejecutar una consulta SQL que elimina el registro de la tabla messages donde el ID coincide con el parámetro id. El método devuelve los resultados de la consulta a través del callback.
    destroy: (con, id, callback) => {
        con.query(`DELETE FROM messages WHERE id= ${id}`, callback);
    },

}