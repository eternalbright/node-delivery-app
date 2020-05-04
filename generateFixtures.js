#!/usr/bin/env node

const { loadFixtures } = require('sequelize-fixtures');
const { name, address, company } = require('faker');

const models = require('./models/define');

(async function () {
    const data = [];

    const addresses = [];
    const cities = [];
    const districts = [];

    async function generateInstances() {
        for (let i = 1; i <= 10; i++) cities.push(address.city());
        for (let i = 1; i <= 20; i++) districts.push(address.streetName());
        for (let i = 1; i <= 30; i++) addresses.push(address.streetAddress());

        for (let id = 1; id < 50; id++) {
            data.push({
                id,
                model: 'Courier',
                data: {
                    name: name.findName(),
                    city: cities[Math.floor(Math.random() * cities.length)]
                }
            });
            data.push({
                id,
                model: 'Customer',
                data: {
                    name: name.findName(),
                    city: cities[Math.floor(Math.random() * cities.length)]
                }
            });
            data.push({
                id,
                model: 'Restaurant',
                data: {
                    name: company.companyName(),
                    city: cities[Math.floor(Math.random() * cities.length)],
                    district:
                        districts[Math.floor(Math.random() * districts.length)],
                    address: address.streetAddress()
                }
            });
        }

        return true;
    }

    async function generateOrders() {
        for (let id = 1; id <= 500; id++) {
            const city = cities[Math.floor(Math.random() * cities.length)];

            const customersInCity = data.filter(
                (x) => x.model === 'Customer' && x.data.city === city
            );
            const couriersInCity = data.filter(
                (x) => x.model === 'Courier' && x.data.city === city
            );
            const restaurantsInCity = data.filter(
                (x) => x.model === 'Restaurant' && x.data.city === city
            );

            const Customer =
                customersInCity[
                    Math.floor(Math.random() * customersInCity.length)
                ];
            const Courier =
                couriersInCity[
                    Math.floor(Math.random() * couriersInCity.length)
                ];
            const Restaurant =
                restaurantsInCity[
                    Math.floor(Math.random() * restaurantsInCity.length)
                ];

            data.push({
                id,
                model: 'Order',
                data: {
                    address:
                        addresses[Math.floor(Math.random() * addresses.length)],
                    city: city,
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

        return true;
    }

    console.log('Generating fixtures...');

    await generateInstances();
    await generateOrders();

    await loadFixtures(data, models);
})();
