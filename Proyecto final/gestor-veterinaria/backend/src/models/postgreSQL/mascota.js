const {DataTypes} = require('sequelize');
const {sequelize} = require('../../config/database');


const Mascota = sequelize.define('Mascota', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    especie: {
        type: DataTypes.STRING,
        allowNull: false
    },
    raza: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fechaNacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    duenoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'duenos',
            key: 'id'
        }
    },
    observaciones: {
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    tableName: "mascotas",
    timestamps: false
});

module.exports = Mascota;
