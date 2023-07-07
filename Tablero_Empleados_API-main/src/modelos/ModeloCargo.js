const { DataTypes } = require('sequelize');
const db = require('../configuraciones/db');


const Cargo = db.define(
    'Cargo',
    {
        idcargo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        descripcionCargo: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        fechaingreso: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                is: /^\d{4}-\d{2}-\d{2}$/,
            }
        }, 
        
    }, { timestamps: false },
    {
        tableName: 'Cargos',
    }
);

module.exports = Cargo;