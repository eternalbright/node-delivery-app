const Sequelize = require('sequelize');

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD
} = process.env;

const connection = new Sequelize(
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    {
        host: POSTGRES_HOST,
        dialect: 'postgres'
    }
);

module.exports = connection;
