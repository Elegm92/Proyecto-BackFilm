const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.sql');
const User = require('./User');

const Favorite = sequelize.define('Favorite', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  movie_ref: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  movie_source: {
    type: DataTypes.ENUM('omdb', 'mongodb'),
    allowNull: false,
  },
});

User.hasMany(Favorite, { foreignKey: 'user_id' });
Favorite.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Favorite;
//Crear el modelo Favorite del usuario.