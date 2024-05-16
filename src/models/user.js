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
    //Asignar signo del zodiaco y compatibilidad
    let horoscopo = 1;
    let compatibilidad = 1;

    const mes = new Date(fecha_nacimiento).getMonth() + 1;
    const dia = new Date(fecha_nacimiento).getDate();

    switch (mes) {
      case 1:
        if (dia <= 19) {
          horoscopo = 1;
        } else if (dia >= 20) {
          horoscopo = 2;
        }
        break;
      case 2:
        if (dia <= 18) {
          horoscopo = 2;
        } else if (dia >= 19) {
          horoscopo = 3;
        }
        break;
      case 3:
        if (dia <= 20) {
          horoscopo = 3;
        } else if (dia >= 21) {
          horoscopo = 4;
        }
        break;
      case 4:
        if (dia <= 19) {
          horoscopo = 4;
        } else if (dia >= 20) {
          horoscopo = 5;
        }
        break;
      case 5:
        if (dia <= 20) {
          horoscopo = 5;
        } else if (dia >= 21) {
          horoscopo = 6;
        }
        break;
      case 6:
        if (dia <= 20) {
          horoscopo = 6;
        } else if (dia >= 21) {
          horoscopo = 7;
        }
        break;
      case 7:
        if (dia <= 22) {
          horoscopo = 7;
        } else if (dia >= 23) {
          horoscopo = 8;
        }
        break;
      case 8:
        if (dia <= 22) {
          horoscopo = 8;
        } else if (dia >= 23) {
          horoscopo = 9;
        }
        break;
      case 9:
        if (dia <= 22) {
          horoscopo = 9;
        } else if (dia >= 23) {
          horoscopo = 10;
        }
        break;
      case 10:
        if (dia <= 21) {
          horoscopo = 10;
        } else if (dia >= 22) {
          horoscopo = 11;
        }
        break;
      case 11:
        if (dia <= 21) {
          horoscopo = 11;
        } else if (dia >= 22) {
          horoscopo = 12;
        }
        break;
      case 12:
        if (dia <= 21) {
          horoscopo = 12;
        } else if (dia >= 22) {
          horoscopo = 12;
        }
        break;
    }

    if (horoscopo === 1 || horoscopo === 5 || horoscopo === 9) {
      compatibilidad = 1;
    } else if (horoscopo === 2 || horoscopo === 6 || horoscopo === 10) {
      compatibilidad = 2;
    } else if (horoscopo === 3 || horoscopo === 7 || horoscopo === 11) {
      compatibilidad = 3;
    } else {
      compatibilidad = 4;
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
            active = '${typeof data.active !== 'undefined' ? data.active : 1}',
            id_horoscopo=${horoscopo},
            id_compatibilidad=${compatibilidad}
        `;
    //si hay algo en el campo descripcion, lo guarda
    if (descripcion) {
      query += `, descripcion ='${data.descripcion}'`;
    }
    con.query(query, callback);
  },
}  