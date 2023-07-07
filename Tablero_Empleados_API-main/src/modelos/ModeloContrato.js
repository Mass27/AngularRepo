const { DataTypes } = require('sequelize');
const db = require('../configuraciones/db');


const Contrato = db.define(
    'Contrato',
    {
        idcontrato: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        tipocontrato: {
            type: DataTypes.STRING(100),
            allowNull: false,
        }
    }, { timestamps: false },
    {
        tableName: 'Contratos',
    }
);

module.exports = Contrato;