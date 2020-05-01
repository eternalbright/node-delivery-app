const { Router } = require('express');

const Restaurant = require('../models/Restaurant');

const router = Router();

router.get('/', async (req, res) => {
    const restaurants = await Restaurant.findAll({ order: [['id', 'ASC']] });

    res.json(restaurants);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Restaurant.findByPk(id)
        .then((restaurant) => res.json(restaurant))
        .catch(() =>
            res.status(404).json({
                status: 'RestaurantNotFound',
                id
            })
        );
});

router.post('/', (req, res) =>
    Restaurant.create(req.body, {
        field: ['name', 'city', 'address']
    })
        .then((restaurant) =>
            res.json({
                status: 'RestaurantCreated',
                ...restaurant.dataValues
            })
        )
        .catch((err) => {
            const statusCode = err.message.includes('Validation') ? 400 : 500;

            res.status(statusCode).json({
                status: 'RestaurantCreationError',
                message: err.errors[0].message
            });
        })
);

router.patch('/:id', async (req, res) => {
    const { id } = req.params;

    const restaurant = await Restaurant.findByPk(id);

    if (!restaurant) {
        res.status(404).json({
            status: 'RestaurantNotFound',
            id
        });
    } else {
        restaurant
            .update(req.body)
            .then((updatedRestaurant) =>
                res.json({
                    status: 'RestaurantUpdated',
                    ...updatedRestaurant.dataValues
                })
            )
            .catch((err) => {
                const statusCode = err.message.includes('Validation')
                    ? 400
                    : 500;

                res.status(statusCode).json({
                    status: 'RestaurantUpdatingError',
                    message: err.errors[0].message
                });
            });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const restaurant = await Restaurant.findByPk(id);

    if (!restaurant) {
        res.status(404).json({
            status: 'RestaurantNotFound',
            id
        });
    } else {
        restaurant.destroy();

        res.json({
            status: 'RestaurantDeleted',
            id
        });
    }
});

module.exports = router;
