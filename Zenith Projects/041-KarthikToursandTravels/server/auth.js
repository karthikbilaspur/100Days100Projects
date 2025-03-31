const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secretKey = process.env.SECRET_KEY;


const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};


const authorize = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role !== 'admin') {
      res.status(403).send({ error: 'You are not authorized to access this resource.' });
    } else {
      next();
    }
  } catch (err) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
};


module.exports = { authenticate, authorize };