// ProductDetails.js
import React from 'react';

const ProductDetails = ({ product }) => {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      <p>Rating: {product.rating}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;