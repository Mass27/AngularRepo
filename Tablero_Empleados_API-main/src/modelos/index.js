const Empleado = require('./ModeloEmpleado');
const Usr = require('./ModeloUsuario');
const Direccion = require('./ModeloDireccion');
const Cargo = require('./ModeloCargo');
const Contrato = require('./ModeloContrato')


exports.CrearModelos = async () => {
    //relacion de tablas en el modelo de Empleados
    
    //USUARIO
    await Usr.sync().then(() => {
        console.log('Modelo USUARIO Creado correctamente');
    })
        .catch((err) => {
            console.log('Error al crear el modelo Usuario');
        })
   // DIRECCION
    await Direccion.sync().then(() => {
        console.log('Modelo DIRECCION Creado correctamente');
    })
        .catch((err) => {
            console.log('Error al crear el modelo Direccion');
        })
    //CONTRATO
    await Contrato.sync().then(() => {
        console.log('Modelo CONTRATO Creado correctamente');
    })
        .catch((err) => {
            console.log('Error al crear el modelo contrato');
        })
    //CARGOS
    await Cargo.sync().then(() => {
        console.log('Modelo CARGO Creado correctamente');
    })
        .catch((err) => {
            console.log('Error al crear el modelo Cargo');
        })
    //EMPLEADO
    await Empleado.sync().then(() => {
        console.log('Modelo EMPLEADO Creado correctamente');
    })
        .catch((err) => {
            console.log('Error al crear el modelo Empleado');
        })
};
