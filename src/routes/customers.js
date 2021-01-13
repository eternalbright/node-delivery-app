const { Router } = require('express');

const { Customer, Order } = require('../models');
const { common, getAll, post, put } = require('../schemas/customer');

const router = Router();

router.get('/', getAll, async (req, res) => {
    const { page, limit } = req.query;

    const offset = page || 1;
    const size = limit || 20;

    const errorHandler = (err) =>
        res.status(500).json({
            status: 'GetCustomersError',
            message: err
        });

    const { count } = await Customer.findAndCountAll().catch((err) => errorHandler(err));

    if (!count)
        res.json({
            result: [],
            count: count,
            pages: Math.ceil(count / size)
        });
    else
        Customer.findAll({
            offset: size * (offset - 1),
            limit: size,
            order: [['id', 'ASC']]
        })
            .then((customers) =>
                res.json({
                    result: customers,
                    count: count,
                    pages: Math.ceil(count / size)
                })
            )
            .catch((err) => errorHandler(err));
});

router.get('/:id', common, async (req, res) => {
    const { id } = req.params;

    const customer = await Customer.findByPk(id, {
        include: [{ model: Order, as: 'Orders' }]
    }).catch((err) =>
        res.status(500).json({
            status: 'GetCustomerByIdError',
            message: err
        })
    );

    if (!customer)
        res.status(404).json({
            status: 'CustomerNotFound',
            id: parseInt(id)
        });
    else res.json(customer);
});

router.post('/', post, (req, res) =>
    Customer.create(req.body)
        .then((customer) =>
            res.json({
                status: 'CustomerCreated',
                ...customer.dataValues
            })
        )
        .catch((err) =>
            res.status(500).json({
                status: 'CustomerCreationError',
                message: err
            })
        )
);

router.put('/:id', put, async (req, res) => {
    const { id } = req.params;

    const errorHandler = (err) =>
        res.status(500).json({
            status: 'CustomerUpdatingError',
            message: err
        });

    const customer = await Customer.findByPk(id).catch((err) => errorHandler(err));

    if (!customer)
        res.status(404).json({
            status: 'CustomerNotFound',
            id: parseInt(id)
        });
    else
        customer
            .update(req.body)
            .then((updatedCustomer) =>
                res.json({
                    status: 'CustomerUpdated',
                    ...updatedCustomer.dataValues
                })
            )
            .catch((err) => errorHandler(err));
});

router.delete('/:id', common, async (req, res) => {
    const { id } = req.params;

    const customer = await Customer.findByPk(id).catch((err) =>
        res.status(500).json({
            status: 'CustomerDeletionError',
            message: err
        })
    );

    if (!customer)
        res.status(404).json({
            status: 'CustomerNotFound',
            id: parseInt(id)
        });
    else {
        await customer.destroy();

        res.json({
            status: 'CustomerDeleted',
            ...customer.dataValues
        });
    }
});

module.exports = router;
