const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Restaurant = sequelize.define('restaurant', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        noUpdate: true
    },
    city: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    district: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
});

module.exports = Restaurant;
