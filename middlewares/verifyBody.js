module.exports = (err, req, res, next) => {
    if (err instanceof SyntaxError) {
        res.status(400).send({
            error: 'BadRequest',
            message: 'The body is not JSON serializable'
        });
    }

    next();
};
