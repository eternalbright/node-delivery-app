const Courier = require('../models/Courier');
const Customer = require('../models/Customer');
const Order = require('../models/Order');
const Restaurant = require('../models/Restaurant');

Order.belongsTo(Courier, { as: 'Courier', foreignKey: 'courierId' });
Order.belongsTo(Customer, { as: 'Customer', foreignKey: 'customerId' });
Order.belongsTo(Restaurant, {
    as: 'Restaurant',
    foreignKey: 'restaurantId'
});

Courier.hasMany(Order, { as: 'Orders', foreignKey: 'courierId' });

Customer.hasMany(Order, { as: 'Orders', foreignKey: 'customerId' });

Restaurant.hasMany(Order, { as: 'Orders', foreignKey: 'restaurantId' });

module.exports = {
    Courier,
    Customer,
    Order,
    Restaurant
};
