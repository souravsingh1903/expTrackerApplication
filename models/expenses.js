// models/expenses.js
const Sequelize = require('sequelize');
const sequelize = require('../util/databaseConnector');

const Expenses = sequelize.define(
  'Expenses',
  {
    date: { type: Sequelize.DATEONLY, allowNull: false },
    name: { type: Sequelize.STRING, allowNull: false },
    amount: { type: Sequelize.INTEGER, allowNull: false },
    category: { type: Sequelize.ENUM('Food', 'Transportation', 'Housing', 'Health and Wellness', 'Others'), defaultValue: 'Others' },
  }
);

module.exports = Expenses;
