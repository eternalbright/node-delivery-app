const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Order = sequelize.define('order', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    courierId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: 'A cost should be specified'
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
    district: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: 'A district should be specified'
            },
            isAlpha: {
                args: true,
                msg: 'A district should be a string literal'
            }
        }
    },
    address: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: 'An address should be specified'
            },
            isAlphanumeric: {
                args: true,
                msg: 'An address should be an alphanumeric string'
            }
        }
    }
});

module.exports = Order;
