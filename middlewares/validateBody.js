module.exports = (err, req, res, next) => {
    if (err instanceof SyntaxError || !req.body) {
        res.status(400).send({
            statusCode: 400,
            error: 'BadRequest',
            message: 'The request body is not valid',
            validation: { source: 'body' }
        });
    }

    next();
};
