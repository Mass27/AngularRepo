const Usuario = require('../modelos/ModeloUsuario');
const { validationResult } = require('express-validator');
const MSJ = require('../componentes/mensaje');

exports.Inicio = (req, res) => {
    const moduloUsuario = {
        modulo: 'Usuarios',
        descripcion: 'Contiene la informacion de los Usuarios',
        rutas: [
            {
                ruta: '/api/usuarios/listar',
                descripcion: 'Lista los Usuarios',
                metodo: 'GET',
                parametros: 'usuario, contrasena, correo, codigo, fallido, estado'
            },
            {
                ruta: '/api/usuarios/listarById',
                descripcion: 'Lista los Usuarios por Id',
                metodo: 'GET',
                parametros: 'ninguno'
            },
            {
                ruta: '/api/usuarios/guardar',
                descripcion: 'Guarda los Usuarios',
                metodo: 'POST',
                parametros: 'ninguno'
            },
            {
                ruta: '/api/usuarios/editar',
                descripcion: 'Modifica los Usuarios',
                metodo: 'PUT',
                parametros: 'ninguno'
            },
            {
                ruta: '/api/usuarios/eliminar',
                descripcion: 'Eliminar los Usuarios',
                metodo: 'DELETE',
                parametros: 'ninguno'
            }
        ]
    }
    MSJ('Peticion Mostrar Endpoints Usuarios ejecutada correctamente', 200, moduloUsuario, [], res);
}

exports.Listar = async (req, res) => {
    const listaUsuario = await Usuario.findAll();
    console.log(listaUsuario);
    MSJ('Peticion Usuarios Listar ejecutada correctamente', 200, listaUsuario, [], res);
}

exports.ListarById = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion);
        MSJ('Peticion ejecutada correctamente', 200, [], validacion.errors, res);
    }
    else {
        const { id } = req.query;
        const lista = await Usuario.findOne(
            {
                attributes: ['usuario', 'contrasena', 'correo', 'codigo', 'fallido', 'estado'],
                where: {
                    id: id
                }
            }
        );
        if (!lista) {
            const er = {
                msj: 'el id no existe',
                parametro: 'id'
            }
            MSJ('Peticion ejecutada correctamente', 200, [], er, res);
        }
        else {
            MSJ('Peticion ejecutada correctamente', 200, lista, [], res);
        }
    }
};

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion);
        MSJ('Peticion Guardar Usuario ejecutada correctamente', 200, [], validacion.errors, res);
    } else {
        const { usuario, contrasena, correo, codigo, fallido, estado} = req.body;
        if (!usuario || !contrasena || !correo|| !estado) {
            const er = {
                msj: 'Debe escribir los datos del usuario correctamente',
                parametro: 'usuario, contrasena, correo, estado'
            }
            MSJ('Peticion Guardar Usuario ejecutada correctamente', 200, [], er, res);
        } else {
            await Usuario.create({
                usuario: usuario,
                contrasena: contrasena,
                correo: correo,
                codigo:codigo,
                fallido:fallido,
                estado:estado
            }).then((data) => {
                console.log(data);
                MSJ('Peticion Guardar Usuario ejecutada correctamente', 200, data, [], res);
            }).catch((err) => {
                var er = '';
                if (err && err.errors) {
                    err.errors.forEach(element => {
                        console.log(element.message);
                        er += element.message + '. ';
                    });
                } else {
                    er = 'Error al guardar el Usuario.';
                }
                MSJ('Peticion Guardar Usuario ejecutada correctamente', 200, [], { msj: er }, res);
            });
        }
    }
}
exports.Editar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion);
        MSJ('Peticion Editar Usuario ejecutada correctamente', 200, [], validacion.errors, res);
    } else {
        const { id } = req.query;
        const { usuario, contrasena, correo, codigo, fallido, estado } = req.body;

        if (!usuario || !contrasena || !correo) {
            const er = {
                msj: 'Debe escribir el id del Usuario',
                parametro: 'id'
            }
            MSJ('Peticion Editar Usuario ejecutada correctamente', 200, [], er, res);
        } else {
            await Usuario.update({
                usuario,
                contrasena,
                correo,
                codigo,
                fallido,
                estado
            }, {
                where: {
                    id: id
                }
            })
                .then((data) => {
                    console.log(data);
                    MSJ('Peticion Editar Usuario ejecutada correctamente', 200, data, [], res);
                })
                .catch((err) => {
                    var er = '';
                    err.errors.forEach(element => {
                        console.log(element.message);
                        er += element.message + '. ';
                    });
                    MSJ('Peticion Editar Usuario ejecutada correctamente', 200, [], { msj: er }, res);
                });
        }
    }
}



exports.Eliminar = async (req, res) => {
    const validacion = validationResult(req);

    if (!validacion.isEmpty()) {
        console.log(validacion);
        MSJ('Peticion Eliminar Usuario ejecutada correctamente', 200, [], validacion.errors, res);
    }
    else {
        const { id } = req.query;
        console.log(id);
        if (!id) {
            const er = {
                msj: 'el id del Usuario no existe',
                parametro: 'id'
            }
            MSJ('Peticion Eliminar Usuario ejecutada correctamente', 200, [], er, res);
        }
        else {
            // eliminacion
            await Usuario.destroy({ where: { id: id } })
                .then((data) => {
                    console.log(data);
                    MSJ('Peticion Eliminar Usuario ejecutada correctamente', 200, data, [], res);
                })
                .catch((err) => {
                    console.log(err);
                    res.json("Error al Eliminar el registro")
                })
        }
    }
}