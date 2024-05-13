const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { getFilePath, unlinkFile } = require('../utils/auth');
const { createAccessToken, createRefreshToken } = require('../utils/jwt');

module.exports = {
    index: (req, res) => {
        User.get(req.con, (error, rows) => {
            if (error) {
                res.status(500).send({ response: 'Ha ocurrido un error listando los usuarios' });
            } else {
                res.status(200).send({ response: rows });
            }
        })
    },
    store: (req, res) => {
        const { firstName, lastName, email, password, fecha_nacimiento, descripcion, roleId, img } = req.body;
        const regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/

        // Validar campos obligatorios
        if (!firstName || !lastName || !email || !password || !fecha_nacimiento || !descripcion || !roleId) {
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

        req.body.img = '';
        if (req.files.img) {
            req.body.img = getFilePath(req.files.img);
        }
        User.create(req.con, req.body, (error, row) => {
            if (error) {
                if (req.body.img) unlinkFile(req.body.img);
                if (error.code === 'ER_DUP_ENTRY') { // Email already exists
                    res.status(409).send({ response: error.sqlMessage }); // Send the specific error message
                } else {
                    res.status(500).send({ response: 'Ha ocurrido un error creando el usuario' });
                }
            } else {
                res.status(200).send({ response: row });
            }
        });
    },

    login: (req, res) => {
        const { email, password } = req.body;
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