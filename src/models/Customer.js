const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Customer = sequelize.define('customer', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    city: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
});

module.exports = Customer;
