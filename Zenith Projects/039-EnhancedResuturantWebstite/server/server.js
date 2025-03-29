const express = require('express');
const app = express();
const redis = require('redis');
const https = require('https');
const fs = require('fs');
const redisClient = redis.createClient();
const Joi = require('joi');
const helmet = require('helmet');


const options = {
    key: fs.readFileSync('path/to/ssl/key'),
    cert: fs.readFileSync('path/to/ssl/cert'),
  };
  
  https.createServer(options, app).listen(443, () => {
    console.log('Server listening on port 443');
  });

  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
  });
  

app.use((req, res, next) => {
  const cacheKey = req.url;
  redisClient.get(cacheKey, (err, data) => {
    if (err) {
      next();
    } else if (data) {
      res.send(data);
    } else {
      next();
    }
  });
});

app.get('/api/menu', (req, res) => {
  // ... fetch data from database ...
  const cacheKey = '/api/menu';
  redisClient.set(cacheKey, JSON.stringify(data));
  res.send(data);
});

app.post('/api/menu', (req, res) => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).send({ message: error.details[0].message });
    } else {
      // ... create menu item ...
    }
  });
  
  app.use(helmet())