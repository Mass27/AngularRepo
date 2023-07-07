const { Router } = require('express');

const controladorInicio = require('../controladores/controllerInicio');
const controladorEmpleados = require('../controladores/ControllerEmpleado');
const controladorCargos = require('../controladores/ControllerCargo');
const controladorUsuarios = require('../controladores/ControllerUsuario');
const controladorDireccion = require('../controladores/ControllerDireccion');
const controladorContrato = require('../controladores/ControllerContrato');

const rutas = Router();


rutas.get('/', controladorInicio.Inicio);
rutas.get('/inicio', controladorInicio.Inicio);

rutas.get('/empleados', controladorEmpleados.Inicio);
rutas.get('/usuarios', controladorUsuarios.Inicio);
rutas.get('/direccion', controladorDireccion.Inicio)
rutas.get('/cargos', controladorCargos.Inicio);
rutas.get('/contratos', controladorContrato.Inicio);

module.exports= rutas;