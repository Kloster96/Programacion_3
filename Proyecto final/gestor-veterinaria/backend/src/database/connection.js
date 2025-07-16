const Sequelize = require('sequelize');
require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL){
    console.error('Error: La variable de entorno DATABASE_URL no está definida.');
    process.exit(1);
}

const sequelize = new Sequelize(DATABASE_URL,{
    dialect:"postgres",
    logging:false,
    /*dialectOptions: {
    ssl: {
      require: false,
      rejectUnauthorized: false
    }}*/
})

const dbConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos PostgreSQL establecida con éxito.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos PostgreSQL:', error);
    process.exit(1);
  }
};

module.exports = {
    sequelize,
    dbConnect
};
