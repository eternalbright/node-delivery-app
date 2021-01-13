const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
    common: celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().positive().required()
        }
    }),
    getAll: celebrate({
        [Segments.QUERY]: {
            limit: Joi.number().positive(),
            page: Joi.number().positive()
        }
    }),
    post: celebrate({
        [Segments.BODY]: {
            address: Joi.string()
                .regex(/^[A-я0-9,-]+(?:\s+\w+)*$/)
                .max(50)
                .required(),
            city: Joi.string()
                .regex(/^[A-я]+(?:\s+\w+)*$/)
                .max(50)
                .required(),
            cost: Joi.number().integer().required(),
            customerId: Joi.number().positive().required(),
            district: Joi.string()
                .regex(/^[A-я]+(?:\s+\w+)*$/)
                .max(50)
                .required(),
            restaurantId: Joi.number().positive().required()
        }
    }),
    put: celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().positive().required()
        },
        [Segments.BODY]: {
            address: Joi.string()
                .regex(/^[A-я0-9,-]+(?:\s+\w+)*$/)
                .max(50),
            cost: Joi.number().integer(),
            district: Joi.string()
                .regex(/^[A-я]+(?:\s+\w+)*$/)
                .max(50),
            isDelivered: Joi.boolean()
        }
    })
};
