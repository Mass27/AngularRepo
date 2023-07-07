const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

require('dotenv').config();


const db = require('./configuraciones/db');
const Modelos = require('./modelos');

//inicio del servidor   
const server = express();
server.set('port', 3001);
server.use(morgan('combined'));
server.use(cors());
/* urlencoded: es utilizado para analizar los datos enviados a través de formularios HTML.
al utilizar "server.use(express.urlencoded({extended: false}));" estamos configurandolo para 
que analice los datos application/x-www-form-urlencoded y los convierta en un objeto JavaScript accesible en req.body.

La opción {extended: false} indica que el analizador urlencoded utilizará la biblioteca querystring de Node.js 
para analizar los datos, y solo permitirá cadenas y matrices como valores. Si se establece en true, permitiría 
cualquier tipo de JSON-serializable como valor.
*/
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(cors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE'
  }));
  

server.use('/api/', require('./rutas/index'));
//server.use('/api/imagenes/', express.static(path.join(__dirname, 'public/img'))); //definimos la ruta de las imagenes estaticas
server.use('/api/empleados', require('./rutas/empleadosroute'));
server.use('/api/usuarios', require('./rutas/usuariosroute'));
server.use('/api/direccion', require('./rutas/direccionroute'));
server.use('/api/cargos', require('./rutas/cargosroute'));
server.use('/api/contratos', require('./rutas/contratosroute'));

server.listen(server.get('port'), () => {
    console.log('URL:' + 'http://localhost:' + server.get('port') + '/api');

    db.authenticate().then(() => {
        console.log('Conexion con DB exitosa');
        Modelos.CrearModelos();
    })
        .catch((error) => {
            console.log('error al conectar la DB');
            console.error(error);
        })
});
