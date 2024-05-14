const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;
//Importa la biblioteca jsonwebtoken para utilizarla para crear y decodificar tokens JSON Web Tokens (JWT). Importa la variable de entorno JWT_SECRET_KEY que contiene la clave secreta para firmar los tokens JWT.

//Define una función createAccessToken que toma un objeto user como parámetro y devuelve un token de acceso JWT.
function createAccessToken(user) {
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 5);
    return jwt.sign(_tokenPayload(user, expiration), JWT_SECRET_KEY);
    //Crea una fecha de expiración para el token.
    //Establece la fecha de expiración en 5 horas desde la fecha actual.
    //Crea un token JWT utilizando la función _tokenPayload para generar el payload y la clave secreta JWT_SECRET_KEY para firmar el token.
}

//Define una función createRefreshToken que toma un objeto user como parámetro y devuelve un token de refresh JWT.
function createRefreshToken(user) {
    const expiration = new Date();
    expiration.setMonth(expiration.getMonth() + 1);
    return jwt.sign(_tokenPayload(user, expiration), JWT_SECRET_KEY);
    //Crea una fecha de expiración para el token.
    //Establece la fecha de expiración en 1 mes desde la fecha actual.
    //Crea un token JWT utilizando la función _tokenPayload para generar el payload y la clave secreta JWT_SECRET_KEY para firmar el token.
}

//Define una función decodeToken que toma un token JWT como parámetro y devuelve el payload decodificado.
function decodeToken(token) {
    return jwt.decode(token, JWT_SECRET_KEY); //Decodifica el token JWT utilizando la clave secreta JWT_SECRET_KEY.
}

//Define una función _tokenPayload que toma un objeto user, una fecha de expiración y un tipo de token (opcional) como parámetros y devuelve un objeto payload para el token JWT.
function _tokenPayload(user, expiration, tokenType = 'token') {
    return { //Devuelve un objeto payload que contiene la información del usuario, la fecha de emisión (iat) y la fecha de expiración (exp).
        tokenType,
        user,
        iat: new Date().getTime(),
        exp: expiration.getTime()
    }
}

//Exporta las tres funciones definidas en el archivo como un objeto que contiene las funciones.
module.exports = {
    createAccessToken,
    createRefreshToken,
    decodeToken
}