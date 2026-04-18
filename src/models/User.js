//Ahora vamos a crear el modelo de usuarios en PostgreSQL
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.sql');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user',
  },
  oauth_provider: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  oauth_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  reset_token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  reset_token_exp: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = User;