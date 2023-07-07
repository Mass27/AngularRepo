const Direccion = require('../modelos//ModeloDireccion');
const { validationResult } = require('express-validator');
const MSJ = require('../componentes/mensaje');


exports.Inicio = (req, res) => {
    const moduloDireccion = {
        modulo: 'DIRECCION',
        descripcion: 'Contiene la informacion del Domicilio de los empleados',
        rutas: [
            {
                ruta: '/api/direccion/listar',
                descripcion: 'Lista las direcciones',
                metodo: 'GET',
                parametros: 'ninguno'
            },
            {
                ruta: '/api/direccion/guardar',
                descripcion: 'Guarda las direcciones',
                metodo: 'POST',
                parametros: 'ninguno'
            },
            {
                ruta: '/api/direccion/editar',
                descripcion: 'Modifica las direcciones',
                metodo: 'PUT',
                parametros: 'ninguno'
            },
            {
                ruta: '/api/direccion/eliminar',
                descripcion: 'Eliminar las direcciones',
                metodo: 'DELETE',
                parametros: 'ninguno'
            }
        ]
    }
    MSJ('Peticion Direccion ejecutada correctamente', 200, moduloDireccion, [], res);
}

exports.Listar = async (req, res) => {
    const listaDireccion = await Direccion.findAll();
    console.log(listaDireccion);
    MSJ('Peticion Usuarios Listar ejecutada correctamente', 200, listaDireccion, [], res);
};

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion);
        MSJ('Peticion Guardar Direcciones ejecutada correctamente', 200, [], validacion.errors, res);
    }
    else {
        const { sector, colonia, calle, avenida, numcasa } = req.body;
        if (!colonia || !calle || !numcasa) {
            const er = {
                msj: 'Debe escribir los datos correctamente',
                parametro: 'sector, colonia, calle, avenida, numcasa'
            }
            MSJ('ha ocurrido un error al Guardar Direccion', 400, [], er, res);
        }
        else {
            await Direccion.create({
                sector: sector,
                colonia: colonia,
                calle: calle,
                avenida: avenida,
                numcasa: numcasa
            }).then((data) => {
                console.log(data);
                MSJ('Peticion Guardar Direccion ejecutada correctamente', 200, data, [], res);
            }).catch((err) => {
                var er = '';
                err.errors.forEach(element => {
                    console.log(element.message);
                    er += element.message + '. ';
                });
                MSJ('ha ocurrido un error al Guardar Direccion', 400, [], { msj: er }, res);
            });
        }
    }
}

exports.Editar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion);
        MSJ('Peticion Guardar Direcciones ejecutada correctamente', 200, [], validacion.errors, res);
    } else {
        const { id } = req.query;
        const { sector, colonia, calle, numcasa } = req.body;

        if (!sector || !colonia || !calle || !numcasa) {
            const er = {
                msj: 'Debe escribir el id de la direccion',
                parametro: 'id'
            }
            MSJ('ha ocurrido un error al Guardar Direccion', 400, [], er, res);
        } else {
            await Direccion.update({
                id: id,
                sector: sector,
                colonia: colonia,
                calle: calle,
                numcasa: numcasa
            }, {
                where: {
                    id: id
                }
            })
                .then((data) => {
                    console.log(data);
                    MSJ('Peticion Guardar Direcciones ejecutada correctamente', 200, [], validacion.errors, res);
                })
                .catch((err) => {
                    var er = '';
                    err.errors.forEach(element => {
                        console.log(element.message);
                        er += element.message + '. ';
                    });
                    MSJ('ha ocurrido un error al Guardar Direccion', 400, [], er, res);
                });
        }
    }
}
exports.Eliminar = async (req, res) => {
    const validacion = validationResult(req);

    if (!validacion.isEmpty()) {
        console.log(validacion);
        MSJ('Peticion Eliminar dirección ejecutada correctamente', 200, [], validacion.errors, res);
    } else {
        const { id } = req.query;
        console.log(id);
        if (!id) {
            const er = {
                msj: 'El ID de la dirección no existe',
                parametro: 'id'
            };
            MSJ('Peticion Eliminar dirección ejecutada correctamente', 200, [], er, res);
        } else {
            try {
                // Eliminación de la dirección
                await Direccion.destroy({ where: { id: id } })
                    .then((data) => {
                        console.log(data);
                        MSJ('Peticion Eliminar dirección ejecutada correctamente', 200, data, [], res);
                    })
                    .catch((err) => {
                        console.log(err);
                        res.json("Error al eliminar el registro");
                    });
            } catch (error) {
                console.log(error);
                res.json("Error al eliminar la dirección");
            }
        }
    }
};
