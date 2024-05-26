const bcrypt = require('bcryptjs');
const fs = require('fs');
//Importa la biblioteca bcryptjs para utilizarla para hashear contraseñas. Importa la biblioteca fs para utilizarla para interactuar con el sistema de archivos.

//Define una función hashPassword que toma una contraseña como parámetro y devuelve una contraseña hasheada utilizando bcrypt.
function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
    //Genera un salt aleatorio con una longitud de 10 caracteres utilizando bcrypt.
    //Hashea la contraseña utilizando el salt generado y devuelve el resultado.
}
//Define una funcion que compara la contraseña anterior con ingresada en pagina de perfil
function checkPassword(enteredPassword, storedPasswordHash) {
    return bcrypt.compareSync(enteredPassword, storedPasswordHash);
  }

//Define una función getFilePath que toma un objeto file como parámetro y devuelve la ruta del archivo
function getFilePath(file) {
    const path = file.path.split('\\');
    const fileName = path.pop();
    const folder = path.pop();
    console.log(`${folder}/${fileName}`)
    return `${folder}/${fileName}`;
    //Divide la ruta del archivo en un array de directorios utilizando el carácter \ como separador.
    //Extrae el nombre del archivo del array de directorios.
    //Extrae el nombre del directorio padre del archivo del array de directorios.
    //Devuelve la ruta del archivo concatenando el nombre del directorio padre y el nombre del archivo.
}

//Define una función unlinkFile que toma una ruta de archivo como parámetro y elimina el archivo correspondiente.
function unlinkFile(path) {
    try { //Utiliza un bloque try-catch para manejar cualquier error que ocurra durante la eliminación del archivo.
        if (!path) throw new Error('No hay imagen para eliminar'); //Verifica si la ruta del archivo es válida. Si no lo es, lanza un error.
        fs.unlinkSync(`src/uploads/${path}`) //Elimina el archivo correspondiente utilizando la función unlinkSync de fs.
    } catch (error) {
        console.log(error)
    }
}

//Exporta las tres funciones definidas en el archivo como un objeto que contiene las funciones.
module.exports = {
    hashPassword,
    checkPassword,
    getFilePath,
    unlinkFile
}