module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('restaurants', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false,
                noUpdate: true
            },
            city: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
            district: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
            address: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE
        }),

    down: (queryInterface, Sequelize) => queryInterface.dropTable('restaurants')
};
