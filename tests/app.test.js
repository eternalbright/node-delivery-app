const { loadFile } = require('sequelize-fixtures');
const request = require('supertest');

const app = require('../app');
const models = require('../models/define');

const apiPrefix = '/api/v1';

describe('Courier CRUD', () => {
    const url = `${apiPrefix}/couriers`;

    let localStorage;

    it('should create a new courier', async () => {
        const res = await request(app).post(url).send({
            name: 'testCourier',
            city: 'testCity'
        });

        const { body, statusCode } = res;

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
        const res = await request(app).get(url);

        const { body, statusCode } = res;

        expect(statusCode).toStrictEqual(200);
        expect(body).toHaveProperty('count', 1);
        expect(body).toHaveProperty('pages', 1);
        expect(body).toHaveProperty('result', [{ ...localStorage }]);
    });

    it('should get a courier by id', async () => {
        const { id, name, city, isDelivering } = localStorage;

        const res = await request(app).get(`${url}/${id}`);

        const { body, statusCode } = res;

        expect(statusCode).toStrictEqual(200);
        expect(body).toHaveProperty('id', id);
        expect(body).toHaveProperty('name', name);
        expect(body).toHaveProperty('city', city);
        expect(body).toHaveProperty('isDelivering', isDelivering);
    });

    it('should update a courier', async () => {
        const { id, city, isDelivering } = localStorage;

        const res = await request(app)
            .put(`${url}/${id}`)
            .send({ name: 'updatedCourier' });

        const { body, statusCode } = res;

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

        const res = await request(app).delete(`${url}/${id}`);

        const { body, statusCode } = res;

        expect(statusCode).toStrictEqual(200);
        expect(body).toHaveProperty('status', 'CourierDeleted');
        expect(body).toHaveProperty('id', id);
        expect(body).toHaveProperty('name', name);
        expect(body).toHaveProperty('city', city);
        expect(body).toHaveProperty('isDelivering', isDelivering);
    });
});

describe('Customer CRUD', () => {
    const url = `${apiPrefix}/customers`;

    let localStorage;

    it('should create a new customer', async () => {
        const res = await request(app).post(url).send({
            name: 'testCustomer',
            city: 'testCity'
        });

        const { body, statusCode } = res;

        expect(statusCode).toStrictEqual(200);
        expect(body).toHaveProperty('status', 'CustomerCreated');
        expect(body).toHaveProperty('id', 1);
        expect(body).toHaveProperty('name', 'testCustomer');
        expect(body).toHaveProperty('city', 'testCity');

        delete body.status;
        localStorage = body;
    });

    it('should get all customers', async () => {
        const res = await request(app).get(url);

        const { body, statusCode } = res;

        expect(statusCode).toStrictEqual(200);
        expect(body).toHaveProperty('count', 1);
        expect(body).toHaveProperty('pages', 1);
        expect(body).toHaveProperty('result', [{ ...localStorage }]);
    });

    it('should get a customer by id', async () => {
        const { id, name, city } = localStorage;

        const res = await request(app).get(`${url}/${id}`);

        const { body, statusCode } = res;

        expect(statusCode).toStrictEqual(200);
        expect(body).toHaveProperty('id', id);
        expect(body).toHaveProperty('name', name);
        expect(body).toHaveProperty('city', city);
    });

    it('should update a customer', async () => {
        const { id } = localStorage;

        const res = await request(app)
            .put(`${url}/${id}`)
            .send({ name: 'updatedCustomer' });

        const { body, statusCode } = res;

        expect(statusCode).toStrictEqual(200);
        expect(body).toHaveProperty('id', id);
        expect(body).toHaveProperty('name', 'updatedCustomer');

        delete body.status;
        localStorage = body;
    });

    it('should delete a customer', async () => {
        const { id, name, city } = localStorage;

        const res = await request(app).delete(`${url}/${id}`);

        const { body, statusCode } = res;

        expect(statusCode).toStrictEqual(200);
        expect(body).toHaveProperty('status', 'CustomerDeleted');
        expect(body).toHaveProperty('id', id);
        expect(body).toHaveProperty('name', name);
        expect(body).toHaveProperty('city', city);
    });
});

describe('Restaurant CRUD', () => {
    const url = `${apiPrefix}/restaurants`;

    let localStorage;

    it('should create a new restaurant', async () => {
        const res = await request(app).post(url).send({
            name: 'testRestaurant',
            city: 'testCity',
            district: 'testRestaurantDistrict',
            address: 'testRestaurantAddress'
        });

        const { body, statusCode } = res;

        expect(statusCode).toStrictEqual(200);
        expect(body).toHaveProperty('status', 'RestaurantCreated');
        expect(body).toHaveProperty('id', 1);
        expect(body).toHaveProperty('name', 'testRestaurant');
        expect(body).toHaveProperty('city', 'testCity');

        delete body.status;
        localStorage = body;
    });

    it('should get all restaurants', async () => {
        const res = await request(app).get(url);

        const { body, statusCode } = res;

        expect(statusCode).toStrictEqual(200);
        expect(body).toHaveProperty('count', 1);
        expect(body).toHaveProperty('pages', 1);
        expect(body).toHaveProperty('result', [{ ...localStorage }]);
    });

    it('should get a restaurant by id', async () => {
        const { id, name, city, district, address } = localStorage;

        const res = await request(app).get(`${url}/${id}`);

        const { body, statusCode } = res;

        expect(statusCode).toStrictEqual(200);
        expect(body).toHaveProperty('id', id);
        expect(body).toHaveProperty('name', name);
        expect(body).toHaveProperty('city', city);
        expect(body).toHaveProperty('district', district);
        expect(body).toHaveProperty('address', address);
    });

    it('should update a restaurant', async () => {
        const { id } = localStorage;

        const res = await request(app).put(`${url}/${id}`).send({
            name: 'updatedRestaurantName',
            district: 'updatedRestaurantDistrict',
            address: 'updatedRestaurantAddress'
        });

        const { body, statusCode } = res;

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

        const res = await request(app).delete(`${url}/${id}`);

        const { body, statusCode } = res;

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
    const url = `${apiPrefix}/orders`;

    let localStorage = {};

    beforeAll(async () => {
        await loadFile('fixtures/test.json', models);
    });

    it('should create a new order', async () => {
        const res = await request(app).post(url).send({
            city: 'testCity',
            district: 'testOrderDistrict',
            address: 'testOrderAddress',
            customerId: 2,
            restaurantId: 2,
            cost: 1000
        });

        const { body, statusCode } = res;

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
        const res = await request(app).get(url);

        const { body, statusCode } = res;

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

        const res = await request(app).get(`${url}/${id}`);

        const { body, statusCode } = res;

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

        const res = await request(app).put(`${url}/${id}`).send({
            isDelivered: true
        });

        const { body, statusCode } = res;

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

        const res = await request(app).delete(`${url}/${id}`);

        const { body, statusCode } = res;

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
