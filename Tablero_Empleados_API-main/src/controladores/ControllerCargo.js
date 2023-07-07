const Cargo = require('../modelos/ModeloCargo');
const { validationResult } = require('express-validator');
const MSJ = require('../componentes/mensaje');


exports.Inicio = (req, res) => {
    const moduloCargo = {
        modulo: 'CARGOS',
        descripcion: 'Contiene la informacion de los Cargos',
        rutas: [
            {
                ruta: '/api/cargos/listar',
                descripcion: 'Lista los Cargos',
                metodo: 'GET',
                parametros: 'ninguno'
            },
            {
                ruta: '/api/cargos/listarById',
                descripcion: 'Lista los cargos por Id',
                metodo: 'GET',
                parametros: 'ninguno'
            },
            {
                ruta: '/api/cargos/guardar',
                descripcion: 'Guarda los Cargos',
                metodo: 'POST',
                parametros: 'ninguno'
            },
            {
                ruta: '/api/cargos/editar',
                descripcion: 'Modifica los Cargos',
                metodo: 'PUT',
                parametros: 'ninguno'
            },
            {
                ruta: '/api/cargos/eliminar',
                descripcion: 'Eliminar los Cargos',
                metodo: 'DELETE',
                parametros: 'ninguno'
            }
        ]
    }
    MSJ('Peticion Cargos ejecutada correctamente', 200, moduloCargo, [], res);
}

exports.Listar = async (req, res) => {
    const listaCargo = await Cargo.findAll();
    console.log(listaCargo);
    MSJ('Peticion Listar Cargos ejecutada correctamente',  200, listaCargo, [], res);
};

exports.ListarById = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion);
        MSJ('Peticion ejecutada correctamente', 200, [], validacion.errors, res);
    }
    else {
        const { id } = req.query;
        const lista = await Cargo.findOne({
            attributes: ['idcargo', 'descripcionCargo', 'fechaingreso'],
            where: {
                idcargo: id
            }
        });
        if (!lista) {
            const er = {
                msj: 'El ID no existe',
                parametro: 'id'
            }
            MSJ('Peticion ejecutada correctamente', 200, [], er, res);
        }
        else {
            MSJ('Peticion ejecutada correctamente', 200, lista, [], res);
        }
    }
};

exports.Guardar = async (req, res) =>{
    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        console.log(validacion);
        MSJ('Peticion Guardar Cargo ejecutada correctamente',  200, [], validacion.errors, res);
    }
    else{
        const { descripcionCargo, fechaingreso } = req.body;
        if(!descripcionCargo || !fechaingreso ){
            const er = {
                msj: 'Debe escribir los datos del Cargo correctamente',
                parametro: 'descripcionCargo, fechaingreso'
            }
            MSJ('Peticion Guardar Cargo ERROR',  403, [], {msj: er}, res);
        }
        else{
            await Cargo.create({
                descripcionCargo:descripcionCargo,
                fechaingreso:fechaingreso
            }).then((data)=>{
                console.log(data);
                MSJ('Peticion Guardar Cargo ejecutada correctamente',  200, data, [], res);
            }).catch((err) =>{
                var er='';
                err.errors.forEach(element => {
                    console.log(element.message);
                    er+=element.message + '. ';
                });
                MSJ('Peticion Guardar Cargo ERROR',  403, [], {msj: er}, res);
            });
        }
    }
}

exports.Editar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion);
        MSJ('Peticion Editar Cargo ejecutada correctamente', 200, [], validacion.errors, res);
    } else {
        const { idcargo } = req.query;
        const {descripcionCargo, fechaingreso} = req.body;

        if (!idcargo || !descripcionCargo || !fechaingreso) {
            const er = {
                msj: 'Debe escribir el id del Cargo',
                parametro: 'idcargo'
            }
            MSJ('Peticion Editar Cargo ejecutada correctamente', 200, [], er, res);
        } else {
            await Cargo.update({
                descripcionCargo:descripcionCargo,
                fechaingreso:fechaingreso
            }, {
                where: {
                    idcargo: idcargo
                }
            })
                .then((data) => {
                    console.log(data);
                    MSJ('Peticion Editar Cargo ejecutada correctamente', 200, data, [], res);
                })
                .catch((err) => {
                    var er = '';
                    err.errors.forEach(element => {
                        console.log(element.message);
                        er += element.message + '. ';
                    });
                    MSJ('Peticion Editar Cargo ejecutada correctamente', 200, [], { msj: er }, res);
                });
        }
    }
}

exports.Eliminar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion);
        MSJ('Peticion Eliminar Cargo ejecutada correctamente', 200, [], validacion.errors, res);
    }
    else {
        const { idcargo } = req.query;
        console.log(idcargo);
        if (!idcargo) {
            const er = {
                msj: 'el id del cargo no existe',
                parametro: 'idcargo'
            }
            MSJ('Peticion Eliminar Usuario ejecutada correctamente', 200, [], er, res);
        }
        else {
            // eliminacion
            await Cargo.destroy({ where: { idcargo: idcargo } })
                .then((data) => {
                    console.log(data);
                    MSJ('Peticion Eliminar Cargo ejecutada correctamente', 200, data, [], res);
                })
                .catch((err) => {
                    console.log(err);
                    res.json("Error al Eliminar el registro")
                })
        }
    }
}