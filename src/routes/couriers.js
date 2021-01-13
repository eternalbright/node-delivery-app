const { Router } = require('express');
const { Sequelize, Op } = require('sequelize');

const { Courier, Order } = require('../models');
const { common, getAll, post, put } = require('../schemas/courier');

const router = Router();

router.get('/', getAll, async (req, res) => {
    const { page, limit } = req.query;

    const offset = page || 1;
    const size = limit || 20;

    const errorHandler = (err) =>
        res.status(500).json({
            status: 'GetCouriersError',
            message: err
        });

    const { count } = await Courier.findAndCountAll().catch((err) => errorHandler(err));

    if (!count)
        res.json({
            result: [],
            count: count,
            pages: Math.ceil(count / size)
        });
    else
        Courier.findAll({
            offset: size * (offset - 1),
            limit: size,
            order: [['id', 'ASC']]
        })
            .then((couriers) =>
                res.json({
                    result: couriers,
                    count: count,
                    pages: Math.ceil(count / size)
                })
            )
            .catch((err) => errorHandler(err));
});

router.get('/:id', common, async (req, res) => {
    const { id } = req.params;

    const courier = await Courier.findByPk(id, {
        include: [{ model: Order, as: 'Orders' }]
    }).catch((err) =>
        res.status(500).json({
            status: 'GetCourierByIdError',
            message: err
        })
    );

    if (!courier)
        res.status(404).json({
            status: 'CourierNotFound',
            id: parseInt(id)
        });
    else res.json(courier);
});

router.get('/:id/stats', common, async (req, res) => {
    const { id } = req.params;

    const errorHandler = (err) =>
        res.status(500).json({
            status: 'GetCourierStatsError',
            message: err
        });

    const courier = await Courier.findByPk(id).catch((err) => errorHandler(err));

    if (!courier)
        res.status(404).json({
            status: 'CourierNotFound',
            id: parseInt(id)
        });
    else {
        const totalOrders =
            (await Order.count({
                where: { courierId: id }
            }).catch((err) => errorHandler(err))) || 0;

        const totalOrdersCost =
            (await Order.sum('cost', {
                where: { courierId: id, isDelivered: true }
            }).catch((err) => errorHandler(err))) || 0;

        const mostPopularDeliveryPoints = await Order.findAll({
            where: { courierId: id },
            attributes: ['district', 'city', [Sequelize.fn('COUNT', Sequelize.col('district')), 'count']],
            group: ['district', 'city'],
            order: [[Sequelize.col('count'), 'DESC']]
        }).catch((err) => errorHandler(err));

        const deliveryTime = await Order.findAll({
            where: { courierId: id, deliveredAt: { [Op.ne]: null } },
            attributes: ['createdAt', 'deliveredAt']
        }).catch((err) => errorHandler(err));

        const deliveryTimeAccumulator = deliveryTime.map((ts) => {
            const { createdAt, deliveredAt } = ts.dataValues;

            return Math.floor((deliveredAt.getTime() - createdAt.getTime()) / 1000 / 60);
        });

        const averageDeliveryTime =
            Math.floor(deliveryTimeAccumulator.reduce((acc, val) => acc + val, 0) / deliveryTimeAccumulator.length) ||
            null;

        res.json({
            totalOrders,
            totalOrdersCost,
            averageDeliveryTime,
            mostPopularDeliveryPoints
        });
    }
});

router.post('/', post, (req, res) =>
    Courier.create(req.body, {
        field: ['name', 'city']
    })
        .then((courier) =>
            res.json({
                status: 'CourierCreated',
                ...courier.dataValues
            })
        )
        .catch((err) =>
            res.status(500).json({
                status: 'CourierCreationError',
                message: err
            })
        )
);

router.put('/:id', put, async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    const errorHandler = (err) =>
        res.status(500).json({
            status: 'CourierUpdatingError',
            message: err
        });

    const courier = await Courier.findByPk(id).catch((err) => errorHandler(err));

    if (!courier)
        res.status(404).json({
            status: 'CourierNotFound',
            id: parseInt(id)
        });
    else
        courier
            .update(body)
            .then((updatedCourier) =>
                res.json({
                    status: 'CourierUpdated',
                    ...updatedCourier.dataValues
                })
            )
            .catch((err) => errorHandler(err));
});

router.delete('/:id', common, async (req, res) => {
    const { id } = req.params;

    const courier = await Courier.findByPk(id, {
        include: [{ model: Order, as: 'Orders' }]
    }).catch((err) =>
        res.status(500).json({
            status: 'CourierDeletionError',
            message: err
        })
    );

    if (!courier)
        res.status(404).json({
            status: 'CourierNotFound',
            id: parseInt(id)
        });
    else if (courier.isDelivering)
        res.status(404).json({
            status: 'CourierDeletionError',
            message: 'Unable to delete the courier due to undelivered orders'
        });
    else {
        await courier.destroy();

        res.json({
            status: 'CourierDeleted',
            ...courier.dataValues
        });
    }
});

module.exports = router;
