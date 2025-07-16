const {sequelize} = require('../config/database');

const Dueno = require('./postgreSQL/dueno');
const Mascota = require('./postgreSQL/mascota');
const User = require('./postgreSQL/user');

function initModels() {
    Mascota.belongsTo(Dueno, {
        foreignKey: 'duenoId'
    });
    Dueno.hasMany(Mascota, {
        foreignKey: 'duenoId',
        onDelete: 'CASCADE'
    })
    console.log('Asociaciones de modelos inicializadas.');

    console.log('DEBUG: Asociaciones de Dueno:', Object.keys(Dueno.associations));
    console.log('DEBUG: Asociaciones de Mascota:', Object.keys(Mascota.associations));
    return {
        Dueno,
        Mascota,
        User,
        sequelize
    };
}

async function syncModels() {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida correctamente.');
        await sequelize.sync({force: false});
        console.log('Modelos sincronizados con la base de datos.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos o sincronizar modelos:', error);
        throw error;
    }
}

module.exports = {
    initModels,
    syncModels,
    sequelize
};