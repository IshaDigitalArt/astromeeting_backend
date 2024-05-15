const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { getFilePath, unlinkFile } = require('../utils/auth');
const { createAccessToken, createRefreshToken } = require('../utils/jwt');

//Importa el modelo User desde el archivo user.js en la carpeta models. Importa la biblioteca bcryptjs para utilizarla para hashear y comparar contraseñas.
//Importa las funciones getFilePath y unlinkFile desde el archivo auth.js en la carpeta utils. Importa las funciones createAccessToken y createRefreshToken desde el archivo jwt.js en la carpeta utils.

//Exporta un objeto que contiene los métodos del controlador.
module.exports = {

    //Acceder al sitio
    //Define el método index que se encarga de obtener la lista de usuarios. Utiliza el método get del modelo User para obtener la lista de usuarios y devuelve una respuesta según el resultado de la operación.
    index: (req, res) => {
        User.get(req.con, (error, rows) => {
            if (error) {
                res.status(500).send({ response: 'Ha ocurrido un error listando los usuarios' });
            } else {
                res.status(200).send({ response: rows });
            }
        })
    },

    //Almacenar los datos del usuario
    //Define el método store que se encarga de crear un nuevo usuario. Realiza varias validaciones sobre los campos del formulario, como la longitud de la contraseña, la presencia de caracteres especiales, etc. Luego, utiliza el método create del modelo User para crear el usuario y devuelve una respuesta según el resultado de la operación.
    store: (req, res) => {
        const { firstName, lastName, email, password, fecha_nacimiento, descripcion, roleId, img } = req.body;
        const regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/

        // Validar campos obligatorios
        if (!firstName || !lastName || !email || !password || !fecha_nacimiento || !roleId) {
            return res.status(400).send({ response: 'Faltan campos obligatorios' });
        }

        // Validar formato de email
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            return res.status(400).send({ response: 'Email inválido' });
        }
        // Validar longitud de password
        if (password.length < 6) {
            return res.status(400).send({ response: 'La contraseña debe tener al menos 6 caracteres' });
        }
        //validar que al menos tenga un caracter numerico
        if (!password.split('').some(x => !isNaN(x))) {
            return res.status(400).send({ response: 'La contraseña tiene que tener al menos un caracter numerico' });
        }
        //validar caracter especial
        if (!regex.test(password)) {
            return res.status(400).send({ response: 'La contraseña tiene que tener al menos un caracter especial' });
        }

         //Validar tamaño de la descripcion
         if (descripcion.length>250){
            return res.status(400).send({ response: 'El texto no debe exceder de los 250 carácteres' });
        }
        //Guardar la imagen de perfil del usuario
        req.body.img = '';
        if (req.files.img) {
            req.body.img = getFilePath(req.files.img);
        }

        //Crear el usuario, comprobando email existente, entre otros errores
        User.create(req.con, req.body, (error, row) => {
            if (error) {
                if (req.body.img) unlinkFile(req.body.img);
                if (error.code === 'ER_DUP_ENTRY') { // Email ya existe
                    res.status(409).send({ response: "Email ya existente" }); // Manda un mensaje específico de error
                } else {
                    res.status(500).send({ response: 'Ha ocurrido un error creando el usuario' });
                }
            } else {
                res.status(200).send({ response: row });
            }
        });
    },
    
    //Acceder a un usuario existente
    //Define el método login que se encarga de autenticar a un usuario existente. Utiliza el método getByEmail del modelo User para obtener el usuario por email, y luego compara la contraseña proporcionada con la contraseña hasheada en la base de datos utilizando bcrypt. Si la autenticación es exitosa, devuelve un token de acceso y un token de refresh utilizando las funciones createAccessToken y createRefreshToken.
    login: (req, res) => {
        const { email, password } = req.body;
        //comprueba que el email existe, o que la contraseña es incorrecta
        User.getByEmail(req.con, email, (error, rows) => {
            if (error) {
                res.status(500).send({ response: 'Ha ocurrido un error obteniendo el usuario' });
            } else if (!rows.length) {
                res.status(404).send({ response: 'Email no encontrado' });
            } else {
                const userData = rows[0];
                bcrypt.compare(password, userData.password, (error, check) => {
                    if (error) return res.status(500).send({ response: 'Error del servidor' });
                    if (!check) return res.status(400).send({ response: 'Contraseña incorrecta' });
                    if (!userData.active) return res.status(401).send({ response: 'Usuario inactivo' });
                    delete userData.password;
                    res.status(200).send({
                        response: {
                            token: createAccessToken(userData),
                            refresh: createRefreshToken(userData)
                        }
                    });
                });
            }
        });
    }
}