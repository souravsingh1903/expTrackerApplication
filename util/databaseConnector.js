const Sequelize = require("sequelize").Sequelize;

const sequelize = new Sequelize('expensetracker', 'root', 'Sourav@1999#', {
    host: 'localhost',
    dialect: 'mysql',
  }); 
  module.exports = sequelize;
