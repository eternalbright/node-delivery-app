const { Router } = require('express');

const Customer = require('../models/Customer');

const router = Router();

router.get('/', async (req, res) => {
    const customers = await Customer.findAll({ order: [['id', 'ASC']] });

    res.json(customers);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Customer.findByPk(id)
        .then((customer) => res.json(customer))
        .catch(() =>
            res.status(404).json({
                status: 'CustomerNotFound',
                id
            })
        );
});

router.post('/', (req, res) =>
    Customer.create(req.body, {
        field: ['name', 'city', 'district', 'address']
    })
        .then((customer) =>
            res.json({
                status: 'CustomerCreated',
                ...customer.dataValues
            })
        )
        .catch((err) => {
            const statusCode = err.message.includes('Validation') ? 400 : 500;

            res.status(statusCode).json({
                status: 'CustomerCreationError',
                message: err.errors[0].message
            });
        })
);

router.patch('/:id', async (req, res) => {
    const { id } = req.params;

    const customer = await Customer.findByPk(id);

    if (!customer) {
        res.status(404).json({
            status: 'CustomerNotFound',
            id
        });
    } else {
        customer
            .update(req.body)
            .then((updatedCustomer) =>
                res.json({
                    status: 'CustomerUpdated',
                    ...updatedCustomer.dataValues
                })
            )
            .catch((err) => {
                const statusCode = err.message.includes('Validation')
                    ? 400
                    : 500;

                res.status(statusCode).json({
                    status: 'CustomerUpdatingError',
                    message: err.errors[0].message
                });
            });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const customer = await Customer.findByPk(id);

    if (!customer) {
        res.status(404).json({
            status: 'CustomerNotFound',
            id
        });
    } else {
        customer.destroy();

        res.json({
            status: 'CustomerDeleted',
            id
        });
    }
});

module.exports = router;
