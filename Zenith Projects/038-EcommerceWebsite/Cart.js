// Cart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkoutStatus, setCheckoutStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('/api/cart');
        setCartItems(response.data);
      } catch (error) {
        setError('Failed to fetch cart items.');
      }
    };
    fetchCartItems();
  }, []);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setTotalPrice(totalPrice);
    };
    calculateTotalPrice();
  }, [cartItems]);

  const handleRemoveItem = (item) => {
    setCartItems(cartItems.filter((i) => i !== item));
  };

  const handleCheckout = async () => {
    setCheckoutStatus('submitting');
    try {
      const response = await axios.post('/api/checkout', {
        cartItems,
      });
      if (response.status === 200) {
        setCheckoutStatus('success');
        setCartItems([]);
      } else {
        setError('Failed to checkout.');
        setCheckoutStatus('error');
      }
    } catch (error) {
      setError('Failed to checkout.');
      setCheckoutStatus('error');
    }
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <p>{item.name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: {item.price}</p>
            <button onClick={() => handleRemoveItem(item)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
      {checkoutStatus === 'success' && (
        <p>Checkout successful! Your order is being processed.</p>
      )}
      {checkoutStatus === 'error' && (
        <p style={{ color: 'red' }}>{error}</p>
      )}
      <button onClick={handleCheckout} disabled={checkoutStatus === 'submitting'}>
        {checkoutStatus === 'submitting' ? 'Checking out...' : 'Checkout'}
      </button>
    </div>
  );
};

export default Cart;