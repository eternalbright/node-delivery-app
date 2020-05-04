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
            district: Joi.string()
                .regex(/^[A-я]+(?:\s+\w+)*$/)
                .max(50)
                .required(),
            name: Joi.string()
                .max(50)
                .regex(/^[A-я]+(?:\s+\w+)*$/)
                .required()
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
            city: Joi.string()
                .regex(/^[A-я]+(?:\s+\w+)*$/)
                .max(50),
            district: Joi.string()
                .regex(/^[A-я]+(?:\s+\w+)*$/)
                .max(50),
            name: Joi.string()
                .regex(/^[A-я]+(?:\s+\w+)*$/)
                .max(50)
        }
    })
};
