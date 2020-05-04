const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Order = sequelize.define('order', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    city: {
        type: DataTypes.STRING(50),
        allowNull: false,
        noUpdate: true
    },
    district: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        noUpdate: true
    },
    courierId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        noUpdate: true
    },
    restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        noUpdate: true
    },
    cost: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isDelivered: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    deliveredAt: {
        type: DataTypes.DATE,
        noUpdate: true
    }
});

module.exports = Order;
