const { Router } = require('express');

const { Customer, Order } = require('../models/define');
const { common, getAll, post, put } = require('../schemas/customer');

const router = Router();

router.get('/', getAll, async (req, res) => {
    const { page, limit } = req.query;

    const offset = page || 0;
    const size = limit || 20;

    const errorHandler = (err) =>
        res.status(500).json({
            status: 'GetCustomersError',
            message: err
        });

    const { count } = await Customer.findAndCountAll().catch((err) =>
        errorHandler(err)
    );

    if (!count)
        res.json({
            result: [],
            count: count,
            pages: Math.ceil(count / size)
        });

    Customer.findAll({
        offset: size * (offset - 1),
        limit,
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

    res.json(customer);
});

router.post('/', post, async (req, res) => {
    const customer = await Customer.create(req.body).catch((err) =>
        res.status(500).json({
            status: 'CustomerCreationError',
            message: err
        })
    );

    res.json({
        status: 'CustomerCreated',
        ...customer.dataValues
    });
});

router.put('/:id', put, async (req, res) => {
    const { id } = req.params;

    const errorHandler = (err) =>
        res.status(500).json({
            status: 'CustomerUpdatingError',
            message: err
        });

    const customer = await Customer.findByPk(id).catch((err) =>
        errorHandler(err)
    );

    if (!customer)
        res.status(404).json({
            status: 'CustomerNotFound',
            id: parseInt(id)
        });

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

    await customer.destroy();

    res.json({
        status: 'CustomerDeleted',
        ...customer.dataValues
    });
});

module.exports = router;
