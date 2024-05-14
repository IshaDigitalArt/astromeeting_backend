//Importa la función decodeToken desde el archivo jwt.js en la carpeta utils. Esta función se utiliza para decodificar el token de acceso y obtener los datos del usuario asociados.
const { decodeToken } = require("../utils/jwt");

//Define una función middleware userAuthenticated que se encarga de verificar si el usuario está autenticado.
function userAuthenticated(req, res, next) {
    //Obtiene el encabezado Authorization de la solicitud.
    const { authorization } = req.headers;
    //Verifica si el token de acceso está presente en el encabezado Authorization. Si no está presente, devuelve un error 500 con un mensaje de que el token es requerido.
    if (!authorization) return res.status(500).send({ response: "El token es requerido" });
    //Extrae el token de acceso del encabezado Authorization, eliminando la parte "Bearer " del token.
    const token = authorization.replace('Bearer ', '');
    //Decodifica el token de acceso utilizando la función decodeToken y obtiene los datos del usuario asociados.
    const userData = decodeToken(token);
    try { // Utiliza un bloque try-catch para manejar cualquier error que ocurra durante la verificación del token.
        //Obtiene la fecha de expiración del token (exp) desde los datos del usuario decodificados.
        const { exp } = userData;
        //Obtiene la fecha y hora actuales en milisegundos.
        const currentTime = new Date().getTime();
        //Verifica si el token ha expirado comparando la fecha de expiración con la fecha y hora actuales. Si el token ha expirado, devuelve un error 400 con un mensaje de que el token ha expirado.
        if (exp < currentTime) return res.status(400).send({ response: 'El token ha expirado' });
        next(); //Si el token es válido y no ha expirado, llama al método next() para continuar con la ejecución de la solicitud.
    } catch (error) {
        res.status(400).send({ response: 'El token no es válido' });
    }
}

// Exporta el middleware userAuthenticated como un objeto que contiene la función middleware.
module.exports = {
    userAuthenticated
}