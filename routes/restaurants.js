const { Router } = require('express');

const { Order, Restaurant } = require('../models/define');
const { common, getAll, post, put } = require('../schemas/restaurant');

const router = Router();

router.get('/', getAll, async (req, res) => {
    const { page, limit } = req.query;

    const offset = page || 0;
    const size = limit || 20;

    const errorHandler = (err) =>
        res.status(500).json({
            status: 'GetRestaurantsError',
            message: err
        });

    const { count } = await Restaurant.findAndCountAll().catch((err) =>
        errorHandler(err)
    );

    if (!count)
        res.json({
            result: [],
            count: count,
            pages: Math.ceil(count / size)
        });

    Restaurant.findAll({
        offset: size * (offset - 1),
        limit,
        order: [['id', 'ASC']]
    })
        .then((restaurants) =>
            res.json({
                result: restaurants,
                count: count,
                pages: Math.ceil(count / size)
            })
        )
        .catch((err) => errorHandler(err));
});

router.get('/:id', common, async (req, res) => {
    const { id } = req.params;

    const restaurant = await Restaurant.findByPk(id, {
        include: [{ model: Order, as: 'Orders' }]
    }).catch((err) =>
        res.status(500).json({
            status: 'GetRestaurantByIdError',
            message: err
        })
    );

    if (!restaurant)
        res.status(404).json({
            status: 'RestaurantNotFound',
            id: parseInt(id)
        });

    res.json(restaurant);
});

router.post('/', post, async (req, res) => {
    const restaurant = await Restaurant.create(req.body).catch((err) =>
        res.status(500).json({
            status: 'RestaurantCreationError',
            message: err
        })
    );

    res.json({
        status: 'RestaurantCreated',
        ...restaurant.dataValues
    });
});

router.put('/:id', put, async (req, res) => {
    const { id } = req.params;

    const errorHandler = (err) =>
        res.status(500).json({
            status: 'RestaurantUpdatingError',
            message: err
        });

    const restaurant = await Restaurant.findByPk(id).catch((err) =>
        errorHandler(err)
    );

    if (!restaurant)
        res.status(404).json({
            status: 'RestaurantNotFound',
            id: parseInt(id)
        });

    restaurant
        .update(req.body)
        .then((updatedRestaurant) =>
            res.json({
                status: 'RestaurantUpdated',
                ...updatedRestaurant.dataValues
            })
        )
        .catch((err) => errorHandler(err));
});

router.delete('/:id', common, async (req, res) => {
    const { id } = req.params;

    const restaurant = await Restaurant.findByPk(id).catch((err) =>
        res.status(500).json({
            status: 'RestaurantDeletionError',
            message: err
        })
    );

    if (!restaurant)
        res.status(404).json({
            status: 'RestaurantNotFound',
            id: parseInt(id)
        });

    await restaurant.destroy();

    res.json({
        status: 'RestaurantDeleted',
        ...restaurant.dataValues
    });
});

module.exports = router;
