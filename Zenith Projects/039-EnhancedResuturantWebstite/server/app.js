const express = require('express');
const app = express();
const mongoose = require('mongoose');
const menuRouter = require('./routes/menu');
const ordersRouter = require('./routes/orders');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const authenticate = require('./auth');
const cacheMiddleware = require('./cache');
const redis = require('redis');
const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379,
});
require('dotenv').config();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/restaurant-website', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use('/api/menu', menuRouter);
app.use('/api/orders', ordersRouter);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
app.use(cacheMiddleware);
app.use('/api/menu', menuRoutes);

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});