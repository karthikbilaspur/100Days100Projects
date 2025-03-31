import React from 'react';

const Reviews = ({ reviews }) => {
  return (
    <div>
      <h2>Reviews:</h2>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>{review}</li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;