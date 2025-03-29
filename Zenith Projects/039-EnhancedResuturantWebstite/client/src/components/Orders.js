import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Order = () => {
  const [order, setOrder] = useState({});
  const [paymentIntent, setPaymentIntent] = useState({});

  useEffect(() => {
    axios.get('/api/orders')
      .then(response => {
        setOrder(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post('/api/orders', order);
      setOrder(response.data);
      setPaymentIntent(response.data.paymentIntent);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMakePayment = async () => {
    try {
      const response = await axios.post('/api/payment', { paymentIntent });
      setPaymentIntent(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Order</h1>
      <form>
        <label>Customer Name:</label>
        <input type="text" value={order.customerName} onChange={(event) => setOrder({ ...order, customerName: event.target.value })} />
        <label>Customer Email:</label>
        <input type="email" value={order.customerEmail} onChange={(event) => setOrder({ ...order, customerEmail: event.target.value })} />
        <label>Order Items:</label>
        <ul>
          {order.orderItems.map(item => (
            <li key={item._id}>
              <span>{item.name}</span>
              <span>{item.price}</span>
            </li>
          ))}
        </ul>
        <button onClick={handlePlaceOrder}>Place Order</button>
        {paymentIntent && (
          <button onClick={handleMakePayment}>Make Payment</button>
        )}
      </form>
    </div>
  );
};

export default Order;