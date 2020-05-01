const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const rateLimit = require('express-rate-limit');

const verifyRoute = require('./middlewares/verifyRoute');
const verifyBody = require('./middlewares/verifyBody');

const couriers = require('./routes/couriers');
const customers = require('./routes/customers');
const orders = require('./routes/orders');
const restaurants = require('./routes/restaurants');

const app = express();
const port = process.env.PORT || 8080;

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(limiter);

app.use('/couriers', couriers);
app.use('/customers', customers);
app.use('/orders', orders);
app.use('/restaurants', restaurants);

app.use(verifyRoute);
app.use(verifyBody);

app.listen(port, () => console.info(`Express started on port ${port}`));

module.exports = app;
