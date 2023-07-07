const { DataTypes } = require('sequelize');
const db = require('../configuraciones/db');

const Direccion = db.define(
    'Direccion',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        sector: {
            type: DataTypes.STRING(250),
            allowNull: true,
        },
        colonia: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        calle: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        avenida:{
            type:DataTypes.STRING(250),
            allowNull:true
        },
        numcasa:{
            type: DataTypes.INTEGER,
            allowNull:false
        },

    },{ timestamps: false },
    {
        tableName: 'Direcciones',
    }
);
module.exports = Direccion;