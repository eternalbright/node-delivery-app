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
            city: Joi.string()
                .regex(/^[A-я]+(?:\s+\w+)*$/)
                .max(50)
                .required(),
            name: Joi.string()
                .regex(/^[A-я]+(?:\s+\w+)*$/)
                .max(50)
                .required()
        }
    }),
    put: celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().positive().required()
        },
        [Segments.BODY]: {
            city: Joi.string()
                .regex(/^[A-я]+(?:\s+\w+)*$/)
                .max(50),
            name: Joi.string()
                .regex(/^[A-я]+(?:\s+\w+)*$/)
                .max(50)
        }
    })
};
