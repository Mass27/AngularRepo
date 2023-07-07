const  Sequelize  = require('sequelize');


const db = new Sequelize(
    process.env.BASE_NOMBRE,
    process.env.BASE_USUARIO,
    process.env.BASE_CONTRASENA,
    {
        host: process.env.BASE_SERVIDOR,
        dialect: 'mssql',
        port: process.env.BASE_PORT,
    }
);
module.exports = db;