const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorEmpleados = require('../controladores/ControllerEmpleado');
const rutas = Router();

rutas.get('/inicio', controladorEmpleados.Inicio);
rutas.get('/listar', controladorEmpleados.Listar);
rutas.get('/listarById', controladorEmpleados.ListarById);
rutas.get('/fechaHoy', controladorEmpleados.fecha);


rutas.post('/guardar',                 
body('identidad').isLength({min:13, max: 13}).withMessage('La identidad del empleado debe tener 13 caracteres'),
body('nombrecompleto').isLength({min:3, max: 50}).withMessage('El nombre del empleado debe tener mas de 3 caracteres'),
body('correo').isEmail().isLength({min:3, max: 50}).withMessage('El correo del empleado debe tener mas de 3 caracteres'),
body('genero').isLength({max:20}).withMessage('ingrese un genero no mayor a 20 caracteres'),
body('estcivil').isLength({max:20}).withMessage('ingrese un estado civil no mayor a 20 caracteres "soler@, casad@, etc..."'),
body('telefono').isLength({min:8, max:8}).withMessage('El campo telefono debe tener 8 caracteres numericos'),
body('tiposangre').isLength({max:5}).withMessage('El campo tiposangre debe ser corto "B+, O+, AB+, etc..."'),
body('fechanac').matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('El campo fechanac debe tener el formato YYYY-MM-DD numerico'),
//body('edad').isNumeric().withMessage('El campo edad debe ser numerico'),
body('idusuario').isInt().withMessage('[idusuario] Solo se permiten valores enteros'),
body('iddireccion').isInt().withMessage('[iddireccion] Solo se permiten valores enteros'),
body('idcargo').isInt().withMessage('[idcargo] Solo se permiten valores enteros'),
body('departamento').isLength({min:3, max: 100}).withMessage('El dpartamento del empleado debe tener mas de 3 caracteres'),
body('idcontrato').isInt().withMessage('[idcontrato] Solo se permiten valores enteros'),

//body('imagen')
controladorEmpleados.Guardar);

rutas.put('/editar', 
//body('identidad').isLength({min:13, max: 13}).withMessage('El numero de identidad del Empleado no se puede editar'),
body('correo').isEmail().isLength({min:3, max: 50}).withMessage('El correo del empleado debe tener mas de 3 caracteres'),
body('nombrecompleto').isLength({min:3, max: 50}).withMessage('El nombre del empleado debe tener mas de 3 caracteres'),
body('genero').isLength({max:20}).withMessage('ingrese un genero no mayor a 20 caracteres'),
body('estcivil').isLength({max:20}).withMessage('ingrese un estado civil no mayor a 10 caracteres'),
body('telefono').isLength({ min:8, max: 8}).withMessage('El campo telefono debe tener 13 caracteres'),
body('tiposangre').isLength({max:5}).withMessage('Ingrese el tipo de sangre ejemplo: "B+"'),
body('fechanac').matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('El campo fechanac debe tener el formato YYYY-MM-DD numerico'),
//body('edad').isLength({min:2, max: 3}).withMessage('La edad del Empleado debe ser numerica'),
body('idusuario').isInt().withMessage('[idusuario] Solo se permiten valores enteros'),
body('iddireccion').isInt().withMessage('[iddireccion] Solo se permiten valores enteros'),
body('idcargo').isInt().withMessage('[idcargo] Solo se permiten valores enteros'),
body('departamento').isLength({min:3, max: 100}).withMessage('El dpartamento del empleado debe tener mas de 3 caracteres'),
body('idcontrato').isInt().withMessage('[idcontrato] Solo se permiten valores enteros'),
body('imagen'),
controladorEmpleados.Editar);

rutas.delete('/eliminar', query('id').isInt().withMessage('Solo se permiten valores enteros'),controladorEmpleados.Eliminar);

module.exports= rutas;