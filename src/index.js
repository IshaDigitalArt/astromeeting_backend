const app = require('./app');
//Importa la aplicación Express.js creada en el archivo app.js.

const PORT = process.env.PORT || 4000;
//Establece la variable de entorno PORT con el valor de la variable de entorno PORT si existe, o con el valor 4000 si no existe.

app.listen(PORT, () => console.log('Escuchando el puerto', PORT));
//Inicia la aplicación Express.js y la hace escuchar en el puerto establecido en la variable PORT. Cuando la aplicación se inicia correctamente, se imprime un mensaje en la consola indicando que la aplicación está escuchando en el puerto especificado.