const express = require('express');
const router = express.Router();
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY');

router.post('/', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: req.body.currency, // Pass the currency dynamically from the request body
      payment_method_types: ['card', 'upi'],
    });
    res.json(paymentIntent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating payment intent' });
  }
});

module.exports = router;