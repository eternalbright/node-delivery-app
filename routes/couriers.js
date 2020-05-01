const { Router } = require('express');

const Courier = require('../models/Courier');

const router = Router();

router.get('/', async (req, res) => {
    const users = await Courier.findAll({ order: [['id', 'ASC']] });

    res.json(users);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Courier.findByPk(id)
        .then((courier) => res.json(courier))
        .catch(() =>
            res.status(404).json({
                status: 'CourierNotFound',
                id
            })
        );
});

router.post('/', (req, res) =>
    Courier.create(req.body, {
        field: ['name', 'city']
    })
        .then((courier) =>
            res.json({
                status: 'CourierCreated',
                ...courier.dataValues
            })
        )
        .catch((err) => {
            const statusCode = err.message.includes('Validation') ? 400 : 500;

            res.status(statusCode).json({
                status: 'CourierCreationError',
                message: err.errors[0].message
            });
        })
);

router.patch('/:id', async (req, res) => {
    const { id } = req.params;

    const courier = await Courier.findByPk(id);

    if (!courier) {
        res.status(404).json({
            status: 'CourierNotFound',
            id
        });
    } else {
        courier
            .update(req.body)
            .then((updatedCourier) =>
                res.json({
                    status: 'CourierUpdated',
                    ...updatedCourier.dataValues
                })
            )
            .catch((err) => {
                const statusCode = err.message.includes('Validation')
                    ? 400
                    : 500;

                res.status(statusCode).json({
                    status: 'CourierUpdatingError',
                    message: err.errors[0].message
                });
            });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const courier = await Courier.findByPk(id);

    if (!courier) {
        res.status(404).json({
            status: 'CourierNotFound',
            id
        });
    } else {
        courier.destroy();

        res.json({
            status: 'CourierDeleted',
            id
        });
    }
});

module.exports = router;
