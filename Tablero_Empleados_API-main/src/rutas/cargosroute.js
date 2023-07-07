const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorCargos = require('../controladores/ControllerCargo');
const rutas = Router();

rutas.get('/inicio', controladorCargos.Inicio);
rutas.get('/listar', controladorCargos.Listar);
rutas.get('/listarById', controladorCargos.ListarById);
// prubando fecha

rutas.post('/guardar',
body('descripcioncargo'),                 
body('fechaingreso').matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('El campo fechaongreso debe tener el formato YYYY-MM-DD numerico'),
//body('imagen')
controladorCargos.Guardar);

rutas.put('/editar', 
body('descripcioncargo'),
body('fechaingreso').matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('El campo fechaIngreso debe tener el formato YYYY-MM-DD numerico'),
controladorCargos.Editar);

rutas.delete('/eliminar', query('idcargo').isInt().withMessage('Solo se permiten valores enteros'),controladorCargos.Eliminar);

module.exports= rutas;