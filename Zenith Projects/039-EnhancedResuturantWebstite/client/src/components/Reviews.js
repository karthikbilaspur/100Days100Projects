import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get('/api/reviews')
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleAddReview = async (review) => {
    try {
      const response = await axios.post('/api/reviews', review);
      setReviews([...reviews, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Reviews</h1>
      <ul>
        {reviews.map(review => (
          <li key={review._id}>
            <span>{review.customerName}</span>
            <span>{review.rating}</span>
            <span>{review.review}</span>
          </li>
        ))}
      </ul>
      <form>
        <label>Customer Name:</label>
        <input type="text" />
        <label>Rating:</label>
        <input type="number" />
        <label>Review:</label>
        <textarea />
        <button onClick={(event) => handleAddReview({ customerName: event.target.customerName.value, rating: event.target.rating.value, review: event.target.review.value })}>Add Review</button>
      </form>
    </div>
  );
};

export default Reviews;