const { DataTypes } = require('sequelize');
const db = require('../configuraciones/db');
const bcrypt = require('bcrypt');

const Usr = db.define(
    'Usuario',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        usuario: {
            type: DataTypes.STRING(50), 
            allowNull: false,
            unique: {
                arg: true,
                msg: 'El usuario ya se encuentra asignado'
            },
            validate: {
                len: [2, 50],
            },
        },
        contrasena: {
            type: DataTypes.STRING(250),
            allowNull: false,
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
        codigo: {
            type: DataTypes.STRING(10),
            allowNull: true,
            defaultValue: '0000'
        },
        fallido: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        estado: {
            type: DataTypes.STRING(3),
            allowNull: true,
            defaultValue: 'ACT',
            validate: {
                isIn: {
                    args: [['ACT', 'INA', 'BLO']],
                    msg: 'El campo estado debe tener uno de los estados en MAYUSCULA : ACT, INA, BLO'
                }
            }
        },
    },{ timestamps: false },
    {
        tableName: 'Usuarios',
        hooks: {
            beforeCreate(Usr) {
                const hash = bcrypt.hashSync(Usr.contrasena, 5);
                Usr.contrasena = hash;
            },
            beforeUpdate(Usr) {
                if (Usr.contrasena) {
                    const hash = bcrypt.hashSync(Usr.contrasena, 5);
                    Usr.contrasena = hash;
                }
                if (Usr.fallido >= 5)
                    Usr.estado = 'BL';
            },
        }
    }
);

Usr.prototype.VerificarContrasena = (con, com) => {
    return bcrypt.compareSync(con, com);
};
module.exports = Usr;