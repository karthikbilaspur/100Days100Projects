import React from 'react';

const Ratings = ({ ratings }) => {
  return (
    <div>
      <h2>Ratings:</h2>
      <ul>
        {ratings.map((rating, index) => (
          <li key={index}>{rating}/5</li>
        ))}
      </ul>
    </div>
  );
};

export default Ratings;