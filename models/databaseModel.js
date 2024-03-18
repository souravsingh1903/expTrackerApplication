// models/databaseModel.js
const Sequelize = require('sequelize');
const sequelize = require('../util/databaseConnector');

const User = sequelize.define(
  'Users',
  { 
    name: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, unique: true, allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false },
    isPremiumUser: {type: Sequelize.BOOLEAN},
  }
);
  
module.exports = User;
