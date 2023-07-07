const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorDireccion = require('../controladores/ControllerDireccion');
const rutas = Router();

rutas.get('/inicio', controladorDireccion.Inicio);
rutas.get('/listar', controladorDireccion.Listar);


rutas.post('/guardar',
body('sector').isString(250).withMessage('el campo sector campo debe ser letras'),
body('colonia').isLength({min:3, max:250}).withMessage('el campo colonia debe contener mas de 2 caracteres'),
body('calle').isString(250).withMessage('el campo calle debe contener numero y letras'),
body('avenida').isString(250).withMessage('el campo avenida debe contener numeros y letras'),
body('numcasa').isLength({min:1, max:5}).withMessage('El campo numero de casa debe contener 1 o mas caracteres y menos de 5'),
controladorDireccion.Guardar);
rutas.put('/editar',controladorDireccion.Editar);

rutas.delete('/eliminar', query('id').isInt().withMessage('Solo se permiten valores enteros'),controladorDireccion.Eliminar);

module.exports= rutas;