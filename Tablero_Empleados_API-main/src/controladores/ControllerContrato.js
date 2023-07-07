const Contrato = require('../modelos/ModeloContrato');
const { validationResult } = require('express-validator');
const MSJ = require('../componentes/mensaje');


exports.Inicio = (req, res) => {
    const moduloContrato = {
        modulo: 'CONTRATO',
        descripcion: 'Contiene la informacion de los tipos de contrato',
        rutas: [
            {
                ruta: '/api/contratos/listar',
                descripcion: 'Lista los tipos de contrato',
                metodo: 'GET',
                parametros: 'ninguno'
            },
            {
                ruta: '/api/contratos/listarById',
                descripcion: 'Lista los tipos de contratos por Id',
                metodo: 'GET',
                parametros: 'ninguno'
            },
            {
                ruta: '/api/contratos/guardar',
                descripcion: 'Guarda los tipos de contratos',
                metodo: 'POST',
                parametros: 'ninguno'
            },
            {
                ruta: '/api/contratos/editar',
                descripcion: 'Modifica los tipos de contratos',
                metodo: 'PUT',
                parametros: 'ninguno'
            },
            {
                ruta: '/api/contratos/eliminar',
                descripcion: 'Eliminar los tipos de contratos',
                metodo: 'DELETE',
                parametros: 'ninguno'
            }
        ]
    }
    MSJ('Peticion Contrato ejecutada correctamente', 200, moduloContrato, [], res);
}

exports.Listar = async (req, res) => {
    const listaContrato = await Contrato.findAll();
    console.log(listaContrato);
    MSJ('Peticion Usuarios Listar ejecutada correctamente', 200, listaContrato, [], res);
};

exports.ListarById = async (req, res) => {
        const validacion = validationResult(req);
        if (!validacion.isEmpty()) {
            console.log(validacion);
            MSJ('Peticion ejecutada correctamente', 200, [], validacion.errors, res);
        }
        else {
            const { idcontrato } = req.query;
            const lista = await Contrato.findOne({
                attributes: ['idcontrato', 'tipocontrato'],
                where: {
                    idcontrato: idcontrato
                }
            });
            if (!lista) {
                const er = {
                    msj: 'El ID no existe',
                    parametro: 'idcontrato'
                }
                MSJ('Error al ejecutar la peticion ListarById', 403, [], er, res);
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
        const { tipocontrato } = req.body;
        if(!tipocontrato ){
            const er = {
                msj: 'Debe escribir los datos del tipo de contrato correctamente',
                parametro: 'tipocontrato'
            }
            MSJ('Peticion Guardar Tipo contrato ERROR',  403, [], {msj: er}, res);
        }
        else{
            await Contrato.create({
                tipocontrato:tipocontrato
            }).then((data)=>{
                console.log(data);
                MSJ('Peticion Guardar Contrato ejecutada correctamente',  200, data, [], res);
            }).catch((err) =>{
                var er='';
                err.errors.forEach(element => {
                    console.log(element.message);
                    er+=element.message + '. ';
                });
                MSJ('Peticion Guardar Contrato ERROR',  403, [], {msj: er}, res);
            });
        }
    }
}

exports.Editar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion);
        MSJ('Peticion Editar Contrato ejecutada correctamente', 200, [], validacion.errors, res);
    } else {
        const { idcontrato } = req.query;
        const {tipocontrato} = req.body;

        if (!idcontrato || !tipocontrato) {
            const er = {
                msj: 'Debe escribir el id del Tipo de contrato y el tipocontrato',
                parametro: 'idcontrato'
            }
            MSJ('Peticion Editar Contrato ejecutada correctamente', 200, [], er, res);
        } else {
            await Contrato.update({
                tipocontrato:tipocontrato
            }, {
                where: {
                    idcontrato:idcontrato
                }
            })
                .then((data) => {
                    console.log(data);
                    MSJ('Peticion Editar Contrato ejecutada correctamente', 200, data, [], res);
                })
                .catch((err) => {
                    var er = '';
                    err.errors.forEach(element => {
                        console.log(element.message);
                        er += element.message + '. ';
                    });
                    MSJ('Peticion Editar Contrato ejecutada correctamente', 200, [], { msj: er }, res);
                });
        }
    }
}


exports.Eliminar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion);
        MSJ('Peticion Eliminar contrato ejecutada correctamente', 200, [], validacion.errors, res);
    }
    else {
        const { idcontrato } = req.query;
        console.log(idcontrato);
        if (!idcontrato) {
            const er = {
                msj: 'el id del cargo no existe',
                parametro: 'idcontrato'
            }
            MSJ('Peticion Eliminar tipo contrato ejecutada correctamente', 200, [], er, res);
        }
        else {
            // eliminacion
            await Contrato.destroy({ where: { idcontrato:idcontrato } })
                .then((data) => {
                    console.log(data);
                    MSJ('Peticion Eliminar tipo contrato ejecutada correctamente', 200, data, [], res);
                })
                .catch((err) => {
                    console.log(err);
                    res.json("Error al Eliminar el registro")
                })
        }
    }
}