// Este línea importa el modelo HoroscopeModel desde el archivo horoscope.model.js que se encuentra en la carpeta models. El modelo HoroscopeModel es una representación de la tabla horoscopos en la base de datos.
const HoroscopeModel = require('../models/horoscope.model');

module.exports = {
    async getHoroscope(fecha_nacimiento) {
        // Convertir la fecha de nacimiento a un objeto Date
        const birthDate = new Date(fecha_nacimiento);

        // Obtener el horóscopo correspondiente a la fecha de nacimiento
        const horoscope = await HoroscopeModel.getByDate(birthDate);
        if (!horoscope) {
            throw new Error('No se pudo determinar el horóscopo para la fecha de nacimiento proporcionada');
        }

        // Obtener las compatibilidades para el horóscopo obtenido
        const compatibilities = await CompatibilityModel.getCompatibilities(horoscope.id_horoscopo);
        if (!compatibilities || compatibilities.length === 0) {
            throw new Error('No se encontraron compatibilidades para el horóscopo proporcionado');
        }

        // Devolver el id del horóscopo y el id de la primera compatibilidad encontrada
        return {
            id_horoscopo: horoscope.id_horoscopo,
            id_compatibilidad: compatibilities[0].id_compatibilidad
        };
    },
};
