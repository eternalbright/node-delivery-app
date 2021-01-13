const { join } = require('path');
const Sequelize = require('sequelize');

const { NODE_ENV, POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } = process.env;

let connection;

if (NODE_ENV === 'production')
    connection = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
        host: POSTGRES_HOST,
        dialect: 'postgres'
    });
else
    connection = new Sequelize({
        dialect: 'sqlite',
        storage: join(`${NODE_ENV || 'development'}.sqlite`)
    });

module.exports = connection;
