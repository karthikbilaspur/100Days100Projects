const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const winston = require('winston');
const socketIO = require('socket.io');

const app = express();

// Configure logging
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

// Configure MongoDB connection
mongoose.connect('mongodb://localhost/restaurant-website', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define models
const Menu = mongoose.model('Menu', {
    name: String,
    description: String,
    price: Number,
    rating: Number,
});

const Customer = mongoose.model('Customer', {
    name: String,
    email: String,
    phone: String,
});

const LoyaltyProgram = mongoose.model('LoyaltyProgram', {
    name: String,
    description: String,
    points: Number,
});

const Delivery = mongoose.model('Delivery', {
    name: String,
    address: String,
    phone: String,
});

const Order = mongoose.model('Order', {
    name: String,
    email: String,
    phone: String,
    order: String,
    status: String,
});

// Configure Express middleware
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

// Define routes
const menuRouter = require('./routes/menu');
const ordersRouter = require('./routes/orders');
const reviewsRouter = require('./routes/reviews');

app.use('/api/menu', menuRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/reviews', reviewsRouter);

// Define API endpoints
app.get('/api/menu', async (req, res) => {
    try {
        const menuItems = await Menu.find().select('name description price image').limit(10);
        res.json(menuItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching menu items' });
    }
});

// ... other API endpoints ...

// Configure socket.io
const io = socketIO(app);

io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    socket.on('orderUpdate', (order) => {
        Order.findByIdAndUpdate(order._id, { status: order.status }, (err, order) => {
            if (err) {
                console.error(err);
            } else {
                io.emit('orderUpdate', order);
            }
        });
    });
});

// Start server
const port = 3001;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});