const { unlinkSync } = require('fs');
const { loadFile } = require('sequelize-fixtures');
const request = require('supertest');

const app = require('../app');
const models = require('../models/define');

const apiPrefix = '/api/v1';
const url = (endpoint) => apiPrefix + endpoint;

describe('Courier CRUD', () => {
    const endpoint = '/couriers';
    const uri = url(endpoint);

    let localStorage;

    it('should create a new courier', async () => {
        const { body, statusCode } = await request(app).post(uri).send({
            name: 'testCourier',
            city: 'testCity'
        });

        expect(statusCode).toStrictEqual(200);
        expect(body).toHaveProperty('status', 'CourierCreated');
        expect(body).toHaveProperty('id', 1);
        expect(body).toHaveProperty('name', 'testCourier');
        expect(body).toHaveProperty('city', 'testCity');
        expect(body).toHaveProperty('isDelivering', false);

        delete body.status;
        localStorage = body;
    });

    it('should get all couriers', async () => {
        const { body, statusCode } = await request(app).get(uri);

        expect(statusCode).toStrictEqual(200);
        expect(body).toHaveProperty('count', 1);
        expect(body).toHaveProperty('pages', 1);
        expect(body).toHaveProperty('result', [{ ...localStorage }]);
    });

    it('should get a courier by id', async () => {
        const { id, name, city, isDelivering } = localStorage;

        const { body, statusCode } = await request(app).get(`${uri}/${id}`);

        expect(statusCode).toStrictEqual(200);
        expect(body).toHaveProperty('id', id);
        expect(body).toHaveProperty('name', name);
        expect(body).toHaveProperty('city', city);
        expect(body).toHaveProperty('isDelivering', isDelivering);
    });

    it('should get a courier statistics by id', async () => {
        const { id } = localStorage;

        const { body, statusCode } = await request(app).get(
            `${uri}/${id}/stats`
        );

        expect(statusCode).toStrictEqual(200);
        expect(body).toHaveProperty('totalOrders', 0);
        expect(body).toHaveProperty('totalOrdersCost', 0);
        expect(body).toHaveProperty('averageDeliveryTime', null);
        expect(body).toHaveProperty('mostPopularDeliveryPoints', []);
    });

    it('should update a courier', async () => {
        const { id, city, isDelivering } = localStorage;

        const { body, statusCode } = await request(app)
            .put(`${uri}/${id}`)
            .send({ name: 'updatedCourier' });

        expect(statusCode).toStrictEqual(200);
        expect(body).toHaveProperty('id', id);
        expect(body).toHaveProperty('name', 'updatedCourier');
        expect(body).toHaveProperty('city', city);
        expect(body).toHaveProperty('isDelivering', isDelivering);

        delete body.status;
        localStorage = body;
    });

    it('should delete a courier', async () => {
        const { id, name, city, isDelivering } = localStorage;

        const { body, statusCode } = await request(app).delete(`${uri}/${id}`);

        expect(statusCode).toStrictEqual(200);
        expect(body).toHaveProperty('status', 'CourierDeleted');
        expect(body).toHaveProperty('id', id);
        expect(body).toHaveProperty('name', name);
        expect(body).toHaveProperty('city', city);
        expect(body).toHaveProperty('isDelivering', isDelivering);
    });
});

describe('Customer CRUD', () => {
    const endpoint = '/customers';
    const uri = url(endpoint);

    let localStorage;

    it('should create a new customer', async () => {
        const { body, statusCode } = await request(app).post(uri).send({
            name: 'testCustomer',
            city: 'testCity'
        });

        expect(statusCode).toStrictEqual(200);
        expect(body).toHaveProperty('status', 'CustomerCreated');
        expect(body).toHaveProperty('id', 1);
        expect(body).toHaveProperty('name', 'testCustomer');
        expect(body).toHaveProperty('city', 'testCity');

        delete body.status;
        localStorage = body;
    });

    it('should get all customers', async () => {
        const { body, statusCode } = await request(app).get(uri);

        expect(statusCode).toStrictEqual(200);
        expect(body).toHaveProperty('count', 1);
        expect(body).toHaveProperty('pages', 1);
        expect(body).toHaveProperty('result', [{ ...localStorage }]);
    });

    it('should get a customer by id', async () => {
        const { id, name, city } = localStorage;

        const { body, statusCode } = await request(app).get(`${uri}/${id}`);

        expect(statusCode).toStrictEqual(200);
        expect(body).toHaveProperty('id', id);
        expect(body).toHaveProperty('name', name);
        expect(body).toHaveProperty('city', city);
    });

    it('should update a customer', async () => {
        const { id } = localStorage;

        const { body, statusCode } = await request(app)
            .put(`${uri}/${id}`)
            .send({ name: 'updatedCustomer' });

        expect(statusCode).toStrictEqual(200);
        expect(body).toHaveProperty('id', id);
        expect(body).toHaveProperty('name', 'updatedCustomer');

        delete body.status;
        localStorage = body;
    });

    it('should delete a customer', async () => {
        const { id, name, city } = localStorage;

        const { body, statusCode } = await request(app).delete(`${uri}/${id}`);

        expect(statusCode).toStrictEqual(200);
        expect(body).toHaveProperty('status', 'CustomerDeleted');
        expect(body).toHaveProperty('id', id);
        expect(body).toHaveProperty('name', name);
        expect(body).toHaveProperty('city', city);
    });
});

describe('Restaurant CRUD', () => {
    const endpoint = '/restaurants';
    const uri = url(endpoint);

    let localStorage;

    it('should create a new restaurant', async () => {
        const { body, statusCode } = await request(app).post(uri).send({
            name: 'testRestaurant',
            city: 'testCity',
            district: 'testRestaurantDistrict',
            address: 'testRestaurantAddress'
        });

        expect(statusCode).toStrictEqual(200);
        expect(body).toHaveProperty('status', 'RestaurantCreated');
        expect(body).toHaveProperty('id', 1);
        expect(body).toHaveProperty('name', 'testRestaurant');
        expect(body).toHaveProperty('city', 'testCity');

        delete body.status;
        localStorage = body;
    });

    it('should get all restaurants', async () => {
        const { body, statusCode } = await request(app).get(uri);

        expect(statusCode).toStrictEqual(200);
        expect(body).toHaveProperty('count', 1);
        expect(body).toHaveProperty('pages', 1);
        expect(body).toHaveProperty('result', [{ ...localStorage }]);
    });

    it('should get a restaurant by id', async () => {
        const { id, name, city, district, address } = localStorage;

        const { body, statusCode } = await request(app).get(`${uri}/${id}`);

        expect(statusCode).toStrictEqual(200);
        expect(body).toHaveProperty('id', id);
        expect(body).toHaveProperty('name', name);
        expect(body).toHaveProperty('city', city);
        expect(body).toHaveProperty('district', district);
        expect(body).toHaveProperty('address', address);
    });

    it('should update a restaurant', async () => {
        const { id } = localStorage;

        const { body, statusCode } = await request(app)
            .put(`${uri}/${id}`)
            .send({
                name: 'updatedRestaurantName',
                district: 'updatedRestaurantDistrict',
                address: 'updatedRestaurantAddress'
            });

        expect(statusCode).toStrictEqual(200);
        expect(body).toHaveProperty('id', id);
        expect(body).toHaveProperty('name', 'updatedRestaurantName');
        expect(body).toHaveProperty('district', 'updatedRestaurantDistrict');
        expect(body).toHaveProperty('address', 'updatedRestaurantAddress');

        delete body.status;
        localStorage = body;
    });

    it('should delete a restaurant', async () => {
        const { id, name, city, district, address } = localStorage;

        const { body, statusCode } = await request(app).delete(`${uri}/${id}`);

        expect(statusCode).toStrictEqual(200);
        expect(body).toHaveProperty('status', 'RestaurantDeleted');
        expect(body).toHaveProperty('id', id);
        expect(body).toHaveProperty('name', name);
        expect(body).toHaveProperty('city', city);
        expect(body).toHaveProperty('district', district);
        expect(body).toHaveProperty('address', address);
    });
});

describe('Order CRUD', () => {
    const endpoint = '/orders';
    const uri = url(endpoint);

    let localStorage = {};

    beforeAll(async () => {
        await loadFile('fixtures/test.json', models);
    });

    it('should create a new order', async () => {
        const { body, statusCode } = await request(app).post(uri).send({
            city: 'testCity',
            district: 'testOrderDistrict',
            address: 'testOrderAddress',
            customerId: 2,
            restaurantId: 2,
            cost: 1000
        });

        expect(statusCode).toStrictEqual(200);
        expect(body).toHaveProperty('status', 'OrderCreated');
        expect(body).toHaveProperty('id', 1);
        expect(body).toHaveProperty('city', 'testCity');
        expect(body).toHaveProperty('district', 'testOrderDistrict');
        expect(body).toHaveProperty('address', 'testOrderAddress');
        expect(body).toHaveProperty('customerId', 2);
        expect(body).toHaveProperty('restaurantId', 2);
        expect(body).toHaveProperty('cost', 1000);
        expect(body).toHaveProperty('isDelivered', false);

        delete body.status;
        localStorage = body;
        localStorage.deliveredAt = null;
    });

    it('should get all orders', async () => {
        const { body, statusCode } = await request(app).get(uri);

        expect(statusCode).toStrictEqual(200);
        expect(body).toHaveProperty('count', 1);
        expect(body).toHaveProperty('pages', 1);
        expect(body).toHaveProperty('result', [{ ...localStorage }]);
    });

    it('should get a order by id', async () => {
        const {
            id,
            city,
            district,
            address,
            customerId,
            restaurantId,
            cost
        } = localStorage;

        const { body, statusCode } = await request(app).get(`${uri}/${id}`);

        expect(statusCode).toStrictEqual(200);
        expect(body).toHaveProperty('id', id);
        expect(body).toHaveProperty('city', city);
        expect(body).toHaveProperty('district', district);
        expect(body).toHaveProperty('address', address);
        expect(body).toHaveProperty('customerId', customerId);
        expect(body).toHaveProperty('restaurantId', restaurantId);
        expect(body).toHaveProperty('cost', cost);
    });

    it('should update a order', async () => {
        const {
            id,
            city,
            district,
            address,
            customerId,
            restaurantId,
            cost
        } = localStorage;

        const { body, statusCode } = await request(app)
            .put(`${uri}/${id}`)
            .send({
                isDelivered: true
            });

        expect(statusCode).toStrictEqual(200);
        expect(body).toHaveProperty('id', id);
        expect(body).toHaveProperty('city', city);
        expect(body).toHaveProperty('district', district);
        expect(body).toHaveProperty('address', address);
        expect(body).toHaveProperty('customerId', customerId);
        expect(body).toHaveProperty('restaurantId', restaurantId);
        expect(body).toHaveProperty('cost', cost);
        expect(body).toHaveProperty('isDelivered', true);
        expect(body).toHaveProperty('deliveredAt');

        delete body.status;
        localStorage = body;
    });

    it('should delete a order', async () => {
        const {
            id,
            city,
            district,
            address,
            customerId,
            restaurantId,
            cost,
            isDelivered,
            deliveredAt
        } = localStorage;

        const { body, statusCode } = await request(app).delete(`${uri}/${id}`);

        expect(statusCode).toStrictEqual(200);
        expect(body).toHaveProperty('status', 'OrderDeleted');
        expect(body).toHaveProperty('id', id);
        expect(body).toHaveProperty('city', city);
        expect(body).toHaveProperty('district', district);
        expect(body).toHaveProperty('address', address);
        expect(body).toHaveProperty('customerId', customerId);
        expect(body).toHaveProperty('restaurantId', restaurantId);
        expect(body).toHaveProperty('cost', cost);
        expect(body).toHaveProperty('isDelivered', isDelivered);
        expect(body).toHaveProperty('deliveredAt', deliveredAt);
    });
});

describe('Corner cases', () => {
    const clearData = async () => {
        const { Courier, Customer, Order, Restaurant } = models;

        await Courier.sync({ force: true });
        await Customer.sync({ force: true });
        await Order.sync({ force: true });
        await Restaurant.sync({ force: true });
    };

    beforeAll(async () => {
        await clearData();
        await loadFile('fixtures/test.json', models);
    });

    it('should return an empty array if no records', async () => {
        await clearData();

        const couriers = await request(app).get(`${apiPrefix}/couriers`);
        const customers = await request(app).get(`${apiPrefix}/customers`);
        const orders = await request(app).get(`${apiPrefix}/orders`);
        const restaurants = await request(app).get(`${apiPrefix}/restaurants`);

        expect(couriers.statusCode).toStrictEqual(200);
        expect(couriers.body).toHaveProperty('count', 0);
        expect(couriers.body).toHaveProperty('pages', 0);
        expect(couriers.body).toHaveProperty('result', []);

        expect(customers.statusCode).toStrictEqual(200);
        expect(customers.body).toHaveProperty('count', 0);
        expect(customers.body).toHaveProperty('pages', 0);
        expect(customers.body).toHaveProperty('result', []);

        expect(orders.statusCode).toStrictEqual(200);
        expect(orders.body).toHaveProperty('count', 0);
        expect(orders.body).toHaveProperty('pages', 0);
        expect(orders.body).toHaveProperty('result', []);

        expect(restaurants.statusCode).toStrictEqual(200);
        expect(restaurants.body).toHaveProperty('count', 0);
        expect(restaurants.body).toHaveProperty('pages', 0);
        expect(restaurants.body).toHaveProperty('result', []);

        await loadFile('fixtures/test.json', models);
    });

    it('should fail on creating a new order if order city and restautant city does not match', async () => {
        const { body, statusCode } = await request(app)
            .post(url('/orders'))
            .send({
                city: 'testCity',
                district: 'testOrderDistrict',
                address: 'testOrderAddress',
                customerId: 1,
                restaurantId: 2,
                cost: 1000
            });

        expect(statusCode).toStrictEqual(404);
        expect(body).toHaveProperty('status', 'OrderCreationError');
    });

    it('should fail on creating a new order if order city and customer city does not match', async () => {
        const { body, statusCode } = await request(app)
            .post(url('/orders'))
            .send({
                city: 'testOrderCity',
                district: 'testOrderDistrict',
                address: 'testOrderAddress',
                customerId: 2,
                restaurantId: 1,
                cost: 1000
            });

        expect(statusCode).toStrictEqual(404);
        expect(body).toHaveProperty('status', 'OrderCreationError');
    });

    it('should fail on creating a new order if no couriers available in the order city', async () => {
        const firstOrder = await request(app).post(url('/orders')).send({
            city: 'testCity',
            district: 'testOrderDistrict',
            address: 'testOrderAddress',
            customerId: 1,
            restaurantId: 1,
            cost: 1000
        });

        const secondOrder = await request(app).post(url('/orders')).send({
            city: 'testCity',
            district: 'testOrderDistrict',
            address: 'testOrderAddress',
            customerId: 2,
            restaurantId: 2,
            cost: 2000
        });

        expect(firstOrder.statusCode).toStrictEqual(200);
        expect(firstOrder.body).toHaveProperty('status', 'OrderCreated');
        expect(firstOrder.body).toHaveProperty('id', 1);
        expect(firstOrder.body).toHaveProperty('city', 'testCity');
        expect(firstOrder.body).toHaveProperty('district', 'testOrderDistrict');
        expect(firstOrder.body).toHaveProperty('address', 'testOrderAddress');
        expect(firstOrder.body).toHaveProperty('customerId', 1);
        expect(firstOrder.body).toHaveProperty('restaurantId', 1);
        expect(firstOrder.body).toHaveProperty('cost', 1000);
        expect(firstOrder.body).toHaveProperty('isDelivered', false);

        expect(secondOrder.statusCode).toStrictEqual(404);
        expect(secondOrder.body).toHaveProperty('status', 'OrderCreationError');
    });

    it('should return 400 if request body contains errors', async () => {
        const { body, statusCode } = await request(app)
            .post(url('/couriers'))
            .send(`{ "name": "testCourier", "city": "testCity", }`)
            .type('json');

        expect(statusCode).toStrictEqual(400);
        expect(body).toHaveProperty('error', 'BadRequest');
    });

    it('should return 404 if request an unassigned route', async () => {
        const { body, statusCode } = await request(app).get(
            `${apiPrefix}/nonexistent`
        );

        expect(statusCode).toStrictEqual(404);
        expect(body).toHaveProperty('error', 'NotFound');
    });

    it('should return 500 if internal server error', async () => {
        unlinkSync('test.sqlite');

        const { body, statusCode } = await request(app)
            .post(url('/couriers'))
            .send({ name: 'testCourier', city: 'testCity' });

        expect(statusCode).toStrictEqual(500);
        expect(body).toHaveProperty('status', 'CourierCreationError');
    });
});
