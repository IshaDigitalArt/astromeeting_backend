// Consulta a la base de datos para obtener todos los horóscopos
const db = require('../config/db');

//Este getAll funciona perfe sacando los horoscopos
module.exports = {
  getAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM horoscopos', (error, results) => {
        if (error) {
          console.error('Error al ejecutar la consulta:', error);
          reject(error);
        } else {
          console.log('Resultados de la consulta:', results);
          resolve(results);
        }
      });
    });
  },
  getByDate(birthDate) {
    return new Promise((resolve, reject) => {
      const month = birthDate.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
      const day = birthDate.getDate();
      const query = 'SELECT * FROM horoscopos WHERE (start_month = ? AND start_day <= ?) OR (end_month = ? AND end_day >= ?)';
      db.query(query, [month, day, month, day], (error, results) => {
        if (error) {
          console.error('Error al ejecutar la consulta:', error);
          reject(error);
        } else {
          resolve(results[0]); // Devolvemos el primer horóscopo que cumpla las condiciones
        }
      });
    });
  },

  getCompatibilities(id_horoscopo) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM compatibilidad WHERE id_horoscopo1 = ? OR id_horoscopo2 = ? OR id_horoscopo3 = ?', [id_horoscopo, id_horoscopo, id_horoscopo], (error, results) => {
        if (error) {
          console.error('Error al ejecutar la consulta:', error);
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
};