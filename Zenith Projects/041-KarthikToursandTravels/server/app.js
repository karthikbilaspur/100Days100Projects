const express = require('express');
const app = express();
const mongoose = require('mongoose');
const redis = require('redis');
const cors = require('cors');
const winston = require('winston');
const cityRoutes = require('./routes/cityRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const cityController = require('./controllers/cityController');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const validateCity = require('./controllers/cityController').validateCity;
const validateUser = require('./controllers/userController').validateUser;
const validateAuth = require('./controllers/authController').validateAuth;
const client = redis.createClient();
const port = process.env.PORT || 5000;
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
mongoose.connect('mongodb://localhost/indian_cities', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl;
  client.get(key, (err, reply) => {
    if (reply) {
      res.json(JSON.parse(reply));
    } else {
      next();
    }
  });
};
app.use(cacheMiddleware);
app.use('/api', cityRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});
app.listen(port, () => {
  logger.info(`Server started on port ${port}`);
});
module.exports = app;