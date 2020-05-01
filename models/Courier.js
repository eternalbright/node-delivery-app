const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Courier = sequelize.define('courier', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: 'A name should be specified'
            },
            isAlpha: {
                args: true,
                msg: 'A name should be a string literal'
            }
        }
    },
    city: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: 'A city should be specified'
            },
            isAlpha: {
                args: true,
                msg: 'A city should be a string literal'
            }
        }
    },
    ordersCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    ordersCost: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    averageDeliveryTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
});

module.exports = Courier;
