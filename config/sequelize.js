const { join } = require('path');

module.exports = {
    development: {
        storage: join('development.sqlite'),
        dialect: 'sqlite',
        logging: true
    },
    test: {
        storage: join('test.sqlite'),
        dialect: 'sqlite'
    },
    production: {
        username: 'root',
        password: 'KnNrgR8M3u2Hyk1rDL0ophkP',
        database: 'delivery',
        host: 'db',
        dialect: 'postgres'
    }
};
