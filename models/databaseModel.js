// models/databaseModel.js
const Sequelize = require('sequelize');
const sequelize = require('../util/databaseConnector');

const User = sequelize.define(
  'User',
  { 
    name: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, unique: true, allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false },
  }
);
  
module.exports = User;
