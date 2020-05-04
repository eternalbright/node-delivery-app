const { errors } = require('celebrate');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');

const swaggerReference = require('./swagger.json');

const rateLimit = require('./middlewares/rateLimit');
const validateRoute = require('./middlewares/validateRoute');
const validateBody = require('./middlewares/validateBody');

const couriers = require('./routes/couriers');
const customers = require('./routes/customers');
const orders = require('./routes/orders');
const restaurants = require('./routes/restaurants');

const { API_VERSION, NODE_ENV, PORT } = process.env;

const app = express();
const apiVersion = API_VERSION || 'v1';
const env = NODE_ENV || 'development';
const port = PORT || 8080;
const router = express.Router();

app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(rateLimit);

app.use(`/api/${apiVersion}`, cors(), router);

router.use(`/couriers`, couriers);
router.use(`/customers`, customers);
router.use(`/orders`, orders);
router.use(`/restaurants`, restaurants);
router.use(`/reference`, swaggerUi.serve, swaggerUi.setup(swaggerReference));

app.use(errors());
app.use(validateRoute);
app.use(validateBody);

app.listen(port, () =>
    console.info(
        `Express started on port ${port} (env: "${env}", apiVersion: "${apiVersion}")`
    )
);

module.exports = app;
