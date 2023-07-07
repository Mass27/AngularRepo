const Empleado = require('../modelos/ModeloEmpleado');
const { validationResult } = require('express-validator');
const moment = require('moment');
const MSJ = require('../componentes/mensaje');
const Sequelize = require('sequelize');



exports.Inicio = (req, res) => {
    const moduloEmpleado = {
        modulo: 'EMPLEADOS',
        descripcion: 'Contiene la informacion de los Empleados',
        rutas: [
            {
                ruta: '/api/empleados/listar',
                descripcion: 'Lista los Empleados',
                metodo: 'GET',
                parametros: 'ninguno'
            },
            {
                ruta: '/api/empleados/listarById',
                descripcion: 'Lista los Empleados por Id',
                metodo: 'GET',
                parametros: 'ninguno'
            },
            {
                ruta: '/api/empleados/guardar',
                descripcion: 'Guarda los Empleados',
                metodo: 'POST',
                parametros: 'ninguno'
            },
            {
                ruta: '/api/empleados/editar',
                descripcion: 'Modifica los Empleados',
                metodo: 'PUT',
                parametros: 'ninguno'
            },
            {
                ruta: '/api/empleados/eliminar',
                descripcion: 'Eliminar los Empleados',
                metodo: 'DELETE',
                parametros: 'ninguno'
            }
        ]
    }
    MSJ('Peticion Empleados ejecutada correctamente', 200, moduloEmpleado, [], res);
}

/*
exports.Listar = async (req, res) => {
    const listaEmpleado = await Empleado.findAll();
    
    const fechaNacimiento = moment('1990-01-01');
    // Calcula la edad utilizando la fecha actual
    const edad = moment().diff(fechaNacimiento, 'years');
    
    // Almacena la edad en la base de datos o realiza alguna otra operación
    // Aquí simplemente lo mostramos en la respuesta HTTP
        //res.send(`La edad es: ${edad}`);
    console.log(listaEmpleado);
    MSJ('Peticion Empleado Listar ejecutada correctamente', 200, listaEmpleado, [], res);

}
*/

exports.Listar = async (req, res) => {
    try {
        const empleados = await Empleado.findAll({
            attributes: {
                include: [
                    'idempleado',
                    'identidad',
                    'nombrecompleto',
                    'correo',
                    'genero',
                    'estcivil',
                    'telefono',
                    'tiposangre',
                    'fechanac',
                    [
                        Sequelize.literal(`DATEDIFF(DAY, GETDATE(), fechanac)`),
                        'edad'
                    ],
                    'departamento',
                    'imagen'
                ]
            }
        });

        res.json(empleados);
    } catch (error) {
        console.error(error);
        res.status(403).json({
            msj: 'No se pudo ejecutar la petición para listar empleados',
            data: [],
            errores: []
        });
    }
};


exports.ListarById = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion);
        MSJ('Peticion ejecutada correctamente', 200, [], validacion.errors, res);
    } else {
        const { idempleado } = req.query;
        const empleado = await Empleado.findByPk(idempleado);
        if (!empleado) {
            const er = {
                msj: 'El ID de empleado no existe',
                parametro: 'ideempleado'
            };
            MSJ('Peticion ejecutada correctamente', 200, [], er, res);
        } else {
            MSJ('Peticion ejecutada correctamente', 200, empleado, [], res);
        }
    }
};

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion);
        MSJ('Peticion Guardar Empleado ejecutada correctamente', 200, [], validacion.errors, res);
    }
    else {
        const { identidad, nombrecompleto, correo, genero, estcivil, telefono, tiposangre, fechanac, idusuario, iddireccion, idcargo, idcontrato, imagen, departamento } = req.body;
        if (!identidad || !nombrecompleto || !correo || !estcivil || !telefono) {
            const er = {
                msj: 'Debe escribir los datos del Empleado correctamente',
                parametro: 'identidad, nombrecompleto, correo, estcivil, telefono'
            }
            MSJ('Peticion Guardar Empleado ejecutada correctamente', 200, [], er, res);
        }
        else {
            await Empleado.create({
                identidad: identidad,
                nombrecompleto: nombrecompleto,
                correo: correo,
                genero: genero,
                estcivil: estcivil,
                telefono: telefono,
                tiposangre: tiposangre,
                fechanac: fechanac,
                idusuario: idusuario,
                iddireccion: iddireccion,
                idcargo: idcargo,
                departamento: departamento,
                idcontrato: idcontrato,
                imagen: imagen

            }).then((data) => {
                console.log(data);
                MSJ('Peticion Guardar Empleado ejecutada correctamente', 200, data, [], res);
            }).catch((err) => {
                var er = '';
                if (err && err.errors && Array.isArray(err.errors)) {
                    err.errors.forEach(element => {
                        console.log(element.message);
                        er += element.message + '. ';
                    });
                }

                MSJ('asegurese que exista el usuario, el cargo, el tipo de contrato y la direccion correcta', 200, [], { msj: er }, res);
            });
        }
    }
}
// CREACION DE LA FUNCION DE FECHA
exports.fecha = async (req, res) => {
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toISOString().split('T')[0];
    MSJ('Funcion Fecha', 200, [fechaFormateada], [], res)
    //res.send(fechaFormateada);
};

exports.Editar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion);
        MSJ('Peticion Editar Empleado ejecutada correctamente', 200, [], validacion.errors, res);
    } else {
        const { id } = req.query;
        const { identidad, nombrecompleto, genero, estcivil, telefono, tiposangre, fechanac, imagen, correo, departamento, idusuario, iddireccion,idcargo, idcontrato } = req.body;

        if (!id || !nombrecompleto || !genero || !estcivil || !telefono || !tiposangre || !fechanac) {
            const er = {
                msj: 'Debe escribir el id del Empleado',
                parametro: 'id'
            }
            MSJ('Peticion Editar Empleado ejecutada correctamente', 200, [], er, res);
        } else {
            await Empleado.update({
                nombrecompleto: nombrecompleto,
                correo: correo,
                genero: genero,
                estcivil: estcivil,
                telefono: telefono,
                tiposangre: tiposangre,
                fechanac: fechanac,
                departamento: departamento,
                idusuario: idusuario,
                iddireccion: iddireccion,
                idcargo: idcargo,
                idcontrato: idcontrato,
                //imagen: imagen
            }, {
                where: {
                    idempleado: id
                }
            })
                .then((data) => {
                    console.log(data);
                    MSJ('Peticion Editar Empleado ejecutada correctamente', 200, data, [], res);
                })
            .catch((err) => {
                var er = '';
                err.errors.forEach(element => {
                    console.log(element.message);
                    er += element.message + '. ';
                });
                MSJ('Peticion Editar Empleado ejecutada correctamente', 200, [], { msj: er }, res);
            });
        }
    }
}

exports.Eliminar = async (req, res) => {
    const validacion = validationResult(req);

    if (!validacion.isEmpty()) {
        console.log(validacion);
        MSJ('Peticion Eliminar Empleado ejecutada correctamente', 200, [], validacion.errors, res);
    }
    else {
        const { id } = req.query;
        console.log(id);
        if (!id) {
            const er = {
                msj: 'el id del empleado no existe',
                parametro: 'id'
            }
            MSJ('Peticion Eliminar Empleado ejecutada correctamente', 200, [], er, res);
        }
        else {
            // eliminacion
            await Empleado.destroy({ where: { idempleado: id } })
                .then((data) => {
                    console.log(data);
                    MSJ('Peticion Eliminar Empleado ejecutada correctamente', 200, data, [], res);
                })
                .catch((err) => {
                    console.log(err);
                    res.json("Error al Eliminar el registro")
                })
        }
    }
}