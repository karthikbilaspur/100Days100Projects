const mongoose = require('./config/database');
const City = require('./models/City');

const cities = [
  {
    name: 'Mumbai',
    state: 'Maharashtra',
    history: 'Mumbai is the capital of Maharashtra and the financial capital of India.',
    placesToVisit: ['Gateway of India', 'Marine Drive', 'Colaba Causeway']
  },
  {
    name: 'Delhi',
    state: 'Delhi',
    history: 'Delhi is the capital of India and has a rich history dating back to the Mughal Empire.',
    placesToVisit: ['Red Fort', 'Qutub Minar', 'India Gate']
  },
  // Add more cities here...
];

City.insertMany(cities)
  .then(() => console.log('Cities seeded successfully'))
  .catch(err => console.error('Error seeding cities:', err));