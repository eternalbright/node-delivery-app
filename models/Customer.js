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

module.exports = Customer;
