module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('orders', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            city: {
                type: Sequelize.STRING(30),
                allowNull: false,
                noUpdate: true
            },
            district: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
            address: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            customerId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                noUpdate: true
            },
            courierId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                noUpdate: true
            },
            restaurantId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                noUpdate: true
            },
            cost: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            isDelivered: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            deliveredAt: {
                type: Sequelize.DATE,
                noUpdate: true
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE
        }),

    down: (queryInterface, Sequelize) => queryInterface.dropTable('orders')
};
