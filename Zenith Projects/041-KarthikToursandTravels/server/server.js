const rateLimit = require('express-rate-limit');
const winston = require('winston');
const jwt = require('jsonwebtoken');
const redis = require('redis');
const Joi = require('joi');

const client = redis.createClient();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: 'error.log' }),
    ],
  });
  
  app.use((err, req, res, next) => {
    logger.error(err);
    res.status(500).send('Internal Server Error');
  });

  app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Authenticate user
    const token = jwt.sign({ username, role: 'admin' }, 'secretkey', {
      expiresIn: '1h',
    });
    res.send({ token });
  });
  
  app.use((req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access denied');
    try {
      const decoded = jwt.verify(token, 'secretkey');
      req.user = decoded;
      next();
    } catch (ex) {
      res.status(400).send('Invalid token');
    }
  });
  
  app.put('/cities/:id', authenticate, authorize('admin'), (req, res) => {
    // Update city
  });

  app.get('/cities', (req, res) => {
    client.get('cities', (err, data) => {
      if (err) {
        // Handle error
      } else if (data) {
        res.send(JSON.parse(data));
      } else {
        // Fetch cities from database
        const cities = [...];
        client.set('cities', JSON.stringify(cities));
        res.send(cities);
      }
    });
  });


  const Joi = require('joi');

const citySchema = Joi.object({
  name: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
});

app.post('/cities', (req, res) => {
  const { error } = citySchema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    // Create city
  }
});