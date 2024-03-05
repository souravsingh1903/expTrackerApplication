const Sequelize = require('sequelize');
const sequelize = require('../util/databaseConnector');

const  User = sequelize.define(
    'User', // name of the table in database
    {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true,
            allowNull: false, }, // primary key
        name: { type: Sequelize.STRING, allowNull: false },
        email: {type: Sequelize.STRING, unique:true,  allowNull: false},
        password: {type : Sequelize.STRING, allowNull : false}
    })

    module.exports = User;
