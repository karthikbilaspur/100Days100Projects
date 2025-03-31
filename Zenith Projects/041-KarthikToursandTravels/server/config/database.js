const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  profilePicture: String
});
const User = mongoose.model('User', userSchema);

// API endpoints
const express = require('express');
const router = express.Router();

// User registration endpoint
router.post('/register', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send(user);
});

// User login endpoint
router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).send('Invalid email or password');
  const isValidPassword = await user.comparePassword(req.body.password);
  if (!isValidPassword) return res.status(401).send('Invalid email or password');
  const token = user.generateAuthToken();
  res.send(token);
});

// User profile endpoint
router.get('/profile', async (req, res) => {
  const user = await User.findById(req.user._id);
  res.send(user);
});
const dbURI = 'mongodb://localhost/indian_cities';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));
  

module.exports = mongoose;