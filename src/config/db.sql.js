const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
  }
);

const connectSQL = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL conectado');
  } catch (error) {
    console.error('Error conectando PostgreSQL:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectSQL };