const { hashPassword } = require("../utils/auth");

module.exports = {
    //Conseguir algun dato del usuario
    get: (con, callback) => {
        con.query('SELECT * FROM users', callback);
    },
    //Conseguir id del usuario para comparar/usar mas adelante
    getById: (con, id, callback) => {
        con.query(`SELECT * FROM users WHERE id= ${id}`, callback);
    },
    //Conseguir mail del usuario para comparar/usar mas adelante
    getByEmail: (con, email, callback) => {
        con.query(`SELECT * FROM users WHERE email= '${email}'`, callback);
    },
    //Almacenar en la base de datos
    create: (con, data, callback) => {
        const { firstName, lastName, email, password, fecha_nacimiento, descripcion, roleId, img } = data;

        // Validar campos obligatorios
        if (!firstName || !lastName || !email || !password || !fecha_nacimiento || !roleId) {
            return callback({ message: 'Faltan campos obligatorios' });
        }
        //Guarda los campos
        let query = `
            INSERT INTO users SET
            firstName = '${data.firstName}',
            lastName = '${data.lastName}',
            email = '${data.email.toLowerCase()}',
            password = '${hashPassword(data.password)}',
            fecha_nacimiento ='${data.fecha_nacimiento}',
            roleId = '${typeof data.roleId !== 'undefined' ? data.roleId : 2}',
            img = '${data.img}',
            active = '${typeof data.active !== 'undefined' ? data.active : 1}'
        `;
        //si hay algo en el campo descripcion, lo guarda
        if (descripcion) {
            query += `, descripcion ='${data.descripcion}'`;
        }

        con.query(query, callback);
    },
}