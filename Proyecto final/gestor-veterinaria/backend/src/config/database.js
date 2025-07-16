const {Sequelize, Model} = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(
    process.env.DATABASE_URL,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST || 'db',
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_NAME || 'app_database',
        username: process.env.DB_USER || 'app_user',
        password: process.env.DB_PASSWORD || 'app_password',
        logging: false,
    }
);

async function dbConnect() {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida correctamente.');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw error;
    }
}
module.exports = {sequelize, dbConnect};