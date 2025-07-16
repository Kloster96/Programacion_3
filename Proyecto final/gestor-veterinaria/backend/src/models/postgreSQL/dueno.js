const {DataTypes} = require('sequelize');
const {sequelize} = require('../../config/database');

const Dueno = sequelize.define('Dueno', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'duenos',
  timestamps: false
});

module.exports = Dueno;