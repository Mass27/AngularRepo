exports.Inicio = (req, res) => {
    const SIGE={
        api: 'Interfaz de programacion del sistema SIGE',
        sigmer: 'Sistema de gestion de Empleados',
        desarrollador: 'Cesar Herrera',
        modulos:[
            {nombre: 'Empleados', ruta: '/api/empleados'},
            {nombre: 'Usuarios', ruta: '/api/usuarios'},
            {nombre: 'Direcciones', ruta: '/api/direccion'},
            {nombre: 'Cargos', ruta: '/api/cargos'},
            {nombre: 'Tipo de contrato', ruta: '/api/tipocontrato'}
        ]
    }
    res.json(SIGE);
};