const { DataTypes } = require('sequelize');
const db = require('../configuraciones/db');
const User = require('./ModeloUsuario');
const Direccion = require('./ModeloDireccion');
const Cargo = require('./ModeloCargo');
const Contrato = require('./ModeloContrato');
const moment = require('moment');
const Empleado = db.define(
    'Empleado',
    {
        idempleado: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        identidad: {
            type: DataTypes.STRING(13),
            allowNull: false,
            unique: {
                arg: true,
                msg: 'la identidad ya se encuentra asignada'
            },
            validate:
            {
                isNumeric:
                {
                    args: true,
                    msg: 'El campo identidad solo acepta dígitos numéricos'
                },
                isCorrectLength: function (value) {
                    if (value && value.length !== 13) {
                        throw new Error("El campo 'identidad' debe tener exactamente 13 dígitos.");
                    }
                }
            }
        },
        nombrecompleto: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: {
                arg: true,
                msg: 'el nombre ya se encuentra asignado'
            },
        },
        correo: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: {
                arg: true,
                msg: 'El correo ya se encuentra asignado'
            },
            validate: {
                isEmail: true,
            },
        },
        genero: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                isAlpha: {
                    msg: 'El campo genero solo debe contener letras'
                }
            }
        },
        estcivil: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                isAlpha: {
                    msg: 'El campo estcivil solo debe contener letras'
                }
            }
        },
        telefono: {
            type: DataTypes.STRING(20),
            allowNull: true,
            unique: {
                arg: true,
                msg: 'el telefono ya se encuentra asignado'
            },
        },
        tiposangre: {
            type: DataTypes.STRING(5),
            allowNull: false
        },
        fechanac: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                is: /^\d{4}-\d{2}-\d{2}$/,
            },
        },
        edad: {
            type: DataTypes.VIRTUAL,
            get() {
                const fechaNacimiento = moment(this.getDataValue('fechanac'));
                const fechaActual = moment();
                const edad = fechaActual.diff(fechaNacimiento, 'years');
                return edad;
            }
        },
        departamento: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        imagen: {
            type: DataTypes.STRING(250),
            allowNull: true
        },
    }, { timestamps: false },
    {
        tableName: 'Empleados',
    },

);
//relacion de las tablas empleados y usuarios
User.hasMany(Empleado, { foreignKey: 'idusuario' });
Empleado.belongsTo(User, { foreignKey: 'idusuario' });

Direccion.hasMany(Empleado, { foreignKey: 'iddireccion' });
Empleado.belongsTo(Direccion, { foreignKey: 'iddireccion' });

Cargo.hasMany(Empleado, { foreignKey: 'idcargo' });
Empleado.belongsTo(Cargo, { foreignKey: 'idcargo' });

Contrato.hasMany(Empleado, { foreignKey: 'idcontrato' });
Empleado.belongsTo(Contrato, { foreignKey: 'idcontrato' });

module.exports = Empleado;