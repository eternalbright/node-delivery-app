module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('orders', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            customerId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            courierId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            cost: {
                type: Sequelize.INTEGER,
                allowNull: false
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

    down: (queryInterface, Sequelize) => queryInterface.dropTable('orders')
};
