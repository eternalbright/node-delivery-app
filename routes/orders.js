const { Router } = require('express');
const { Sequelize } = require('sequelize');

const { Courier, Customer, Order, Restaurant } = require('../models/define');
const { common, getAll, post, put } = require('../schemas/order');

const router = Router();

router.get('/', getAll, async (req, res) => {
    const { page, limit } = req.query;

    const offset = page || 1;
    const size = limit || 20;

    const errorHandler = (err) =>
        res.status(500).json({
            status: 'GetOrdersError',
            message: err
        });

    const { count } = await Order.findAndCountAll().catch((err) =>
        errorHandler(err)
    );

    if (!count)
        res.json({
            result: [],
            count: count,
            pages: Math.ceil(count / size)
        });

    Order.findAll({
        offset: size * (offset - 1),
        limit: size,
        order: [['id', 'ASC']]
    })
        .then((orders) =>
            res.json({
                result: orders,
                count: count,
                pages: Math.ceil(count / size)
            })
        )
        .catch((err) => errorHandler(err));
});

router.get('/:id', common, async (req, res) => {
    const { id } = req.params;

    const order = await Order.findByPk(id, {
        include: [
            { model: Courier, as: 'Courier' },
            { model: Customer, as: 'Customer' },
            { model: Restaurant, as: 'Restaurant' }
        ]
    }).catch((err) =>
        res.status(500).json({
            status: 'GetOrderByIdError',
            message: err
        })
    );

    if (!order)
        res.status(404).json({
            status: 'OrderNotFound',
            id: parseInt(id)
        });

    res.json(order);
});

router.post('/', post, async (req, res) => {
    const { body } = req;
    const { customerId, restaurantId, city } = body;

    const errorHandler = (err) =>
        res.status(500).json({
            status: 'OrderCreationError',
            message: err
        });

    const customer = await Customer.findOne({
        where: { id: customerId, city: city }
    }).catch((err) => errorHandler(err));

    if (!customer)
        res.status(404).json({
            status: 'CustomerNotFound',
            message: `Unable to make order in city "${city}"`,
            id: customerId
        });

    const courier = await Courier.findOne({
        where: { city: city, isDelivering: false },
        order: [Sequelize.fn('RANDOM')]
    }).catch((err) => errorHandler(err));

    if (!courier)
        res.status(404).json({
            status: 'CourierNotFound',
            message: `No couriers available in city "${city}"`
        });
    else body.courierId = courier.id;

    const restaurant = await Restaurant.findOne({
        where: { id: restaurantId, city: city }
    }).catch((err) => errorHandler(err));

    if (!restaurant)
        res.status(404).json({
            status: 'RestaurantNotFound',
            message: `The restaurant does not exist in city "${city}"`
        });

    const order = await Order.create(body).catch((err) => errorHandler(err));

    courier.isDelivering = true;
    await courier.save();

    res.json({
        status: 'OrderCreated',
        ...order.dataValues
    });
});

router.put('/:id', put, async (req, res) => {
    const { body } = req;
    const { id } = req.params;

    const errorHandler = (err) =>
        res.status(500).json({
            status: 'OrderUpdatingError',
            message: err
        });

    const order = await Order.findByPk(id).catch((err) => errorHandler(err));

    if (!order)
        res.status(404).json({
            status: 'OrderNotFound',
            id: parseInt(id)
        });

    const courier = await Courier.findOne({
        where: { id: order.courierId }
    }).catch((err) => errorHandler(err));

    if (!body.isDelivered) body.isDelivered = order.isDelivered;
    else {
        if (!order.isDelivered) {
            courier.isDelivering = false;
            await courier.save();

            body.deliveredAt = new Date();
        }
    }

    order
        .update(body)
        .then((updatedOrder) =>
            res.json({
                status: 'OrderUpdated',
                ...updatedOrder.dataValues
            })
        )
        .catch((err) => errorHandler(err));
});

router.delete('/:id', common, async (req, res) => {
    const { id } = req.params;

    const order = await Order.findByPk(id).catch((err) =>
        res.status(500).json({
            status: 'OrderDeletionError',
            message: err
        })
    );

    if (!order)
        res.status(404).json({
            status: 'OrderNotFound',
            id: parseInt(id)
        });

    if (!order.isDelivered) {
        const courier = await Courier.findOne({
            where: { id: order.courierId }
        });

        courier.isDelivering = false;
        await courier.save();
    }

    await order.destroy();

    res.json({
        status: 'OrderDeleted',
        ...order.dataValues
    });
});

module.exports = router;
