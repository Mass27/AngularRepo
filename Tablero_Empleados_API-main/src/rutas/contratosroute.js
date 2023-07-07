const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorContrato = require('../controladores/ControllerContrato');
const rutas = Router();

rutas.get('/inicio', controladorContrato.Inicio);
rutas.get('/listar', controladorContrato.Listar);
rutas.get('/listarById', controladorContrato.ListarById);

rutas.post('/guardar',controladorContrato.Guardar);
rutas.put('/editar', controladorContrato.Editar);

rutas.delete('/eliminar', query('idcontrato').isInt().withMessage('Solo se permiten valores enteros'),controladorContrato.Eliminar);

module.exports= rutas;