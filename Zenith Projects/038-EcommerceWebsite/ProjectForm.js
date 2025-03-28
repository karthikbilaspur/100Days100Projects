// ProductForm.js
import React, { useState } from 'react';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const product = { name, price, description };
    // Validate input data
    if (!name || !price || !description) {
      alert('Please fill in all fields');
      return;
    }
    // Submit data to server
    fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <label>
        Price:
        <input type="number" value={price} onChange={(event) => setPrice(event.target.value)} />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductForm;