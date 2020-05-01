module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('couriers', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
            city: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
            ordersCount: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            ordersCost: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            averageDeliveryTime: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE
        }),

    down: (queryInterface, Sequelize) => queryInterface.dropTable('couriers')
};
