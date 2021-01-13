const { Router } = require('express');

const { Order, Restaurant } = require('../models');
const { common, getAll, post, put } = require('../schemas/restaurant');

const router = Router();

router.get('/', getAll, async (req, res) => {
    const { page, limit } = req.query;

    const offset = page || 1;
    const size = limit || 20;

    const errorHandler = (err) =>
        res.status(500).json({
            status: 'GetRestaurantsError',
            message: err
        });

    const { count } = await Restaurant.findAndCountAll().catch((err) => errorHandler(err));

    if (!count)
        res.json({
            result: [],
            count: count,
            pages: Math.ceil(count / size)
        });
    else
        Restaurant.findAll({
            offset: size * (offset - 1),
            limit: size,
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
    else res.json(restaurant);
});

router.post('/', post, (req, res) =>
    Restaurant.create(req.body)
        .then((restaurant) =>
            res.json({
                status: 'RestaurantCreated',
                ...restaurant.dataValues
            })
        )
        .catch((err) =>
            res.status(500).json({
                status: 'RestaurantCreationError',
                message: err
            })
        )
);

router.put('/:id', put, async (req, res) => {
    const { id } = req.params;

    const errorHandler = (err) =>
        res.status(500).json({
            status: 'RestaurantUpdatingError',
            message: err
        });

    const restaurant = await Restaurant.findByPk(id).catch((err) => errorHandler(err));

    if (!restaurant)
        res.status(404).json({
            status: 'RestaurantNotFound',
            id: parseInt(id)
        });
    else
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
    else {
        await restaurant.destroy();

        res.json({
            status: 'RestaurantDeleted',
            ...restaurant.dataValues
        });
    }
});

module.exports = router;
