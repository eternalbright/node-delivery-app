#!/usr/bin/env node

const { loadFixtures } = require('sequelize-fixtures');
const { name, address, company } = require('faker');

const models = require('./models/define');

(function () {
    const data = [];

    const addresses = [];
    const cities = [];
    const districts = [];

    for (let i = 1; i <= 10; i++) cities.push(address.city());
    for (let i = 1; i <= 20; i++) districts.push(address.streetName());
    for (let i = 1; i <= 30; i++) addresses.push(address.streetAddress());

    function getRandomValue(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function getRandomEntities(city) {
        function search(arr, model) {
            let results = [];

            arr.forEach((item) => {
                if (item.model === model && item.data.city === city) {
                    results.push(item);
                }
            });

            return results;
        }

        const couriersInCity = search(data, 'Courier');
        const customersInCity = search(data, 'Customer');
        const restaurantsInCity = search(data, 'Restaurant');

        return {
            Courier: getRandomValue(couriersInCity),
            Customer: getRandomValue(customersInCity),
            Restaurant: getRandomValue(restaurantsInCity)
        };
    }

    function generateInstances() {
        for (let id = 1; id < 50; id++) {
            data.push({
                id,
                model: 'Courier',
                data: {
                    name: name.findName(),
                    city: getRandomValue(cities)
                }
            });
            data.push({
                id,
                model: 'Customer',
                data: {
                    name: name.findName(),
                    city: getRandomValue(cities)
                }
            });
            data.push({
                id,
                model: 'Restaurant',
                data: {
                    name: company.companyName(),
                    city: getRandomValue(cities),
                    district: getRandomValue(districts),
                    address: address.streetAddress()
                }
            });
        }
    }

    function generateOrders() {
        for (let id = 1; id <= 200; id++) {
            const city = getRandomValue(cities);

            const { Courier, Customer, Restaurant } = getRandomEntities(city);

            data.push({
                id,
                model: 'Order',
                data: {
                    city,
                    address: getRandomValue(addresses),
                    cost: Math.floor(Math.random() * 500) + 200,
                    courierId: Courier.id,
                    customerId: Customer.id,
                    district: Restaurant.data.district,
                    restaurantId: Restaurant.id,
                    isDelivered: true,
                    deliveredAt: new Date(
                        new Date().getTime() +
                            Math.floor(Math.random() * 10000) * 500
                    )
                }
            });
        }
    }

    console.log('Generating fixtures...');

    generateInstances();
    generateOrders();

    loadFixtures(data, models);
})();
