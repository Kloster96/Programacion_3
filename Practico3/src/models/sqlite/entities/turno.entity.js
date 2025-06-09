const { DataTypes } = require('sequelize');
const {sequelize} = require('./../config/db.js');

const Turno = sequelize.define('Turno',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    pacienteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Pacientes',
            key: 'id'
        },
    },
    motivo:{
        type: DataTypes.STRING,
        allowNull: false
    }
});