const { Router } = require('express');

const Order = require('../models/Order');

const router = Router();

router.get('/', async (req, res) => {
    const users = await Order.findAll({ order: [['id', 'ASC']] });

    res.json(users);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Order.findByPk(id)
        .then((order) => res.json(order))
        .catch(() =>
            res.status(404).json({
                status: 'OrderNotFound',
                id
            })
        );
});

router.post('/', (req, res) =>
    Order.create(req.body, {
        field: ['name', 'cost', 'city', 'district', 'address']
    })
        .then((order) =>
            res.json({
                status: 'OrderCreated',
                ...order.dataValues
            })
        )
        .catch((err) => {
            const statusCode = err.message.includes('Validation') ? 400 : 500;

            res.status(statusCode).json({
                status: 'OrderCreationError',
                message: err.errors[0].message
            });
        })
);

router.patch('/:id', async (req, res) => {
    const { id } = req.params;

    const order = await Order.findByPk(id);

    if (!order) {
        res.status(404).json({
            status: 'OrderNotFound',
            id
        });
    } else {
        order
            .update(req.body)
            .then((updatedOrder) =>
                res.json({
                    status: 'OrderUpdated',
                    ...updatedOrder.dataValues
                })
            )
            .catch((err) => {
                const statusCode = err.message.includes('Validation')
                    ? 400
                    : 500;

                res.status(statusCode).json({
                    status: 'OrderUpdatingError',
                    message: err.errors[0].message
                });
            });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const order = await Order.findByPk(id);

    if (!order) {
        res.status(404).json({
            status: 'OrderNotFound',
            id
        });
    } else {
        order.destroy();

        res.json({
            status: 'OrderDeleted',
            id
        });
    }
});

module.exports = router;
