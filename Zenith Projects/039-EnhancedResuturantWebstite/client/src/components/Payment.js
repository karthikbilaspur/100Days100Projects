import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [giftCardNumber, setGiftCardNumber] = useState(null);
  const [loyaltyProgramNumber, setLoyaltyProgramNumber] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // ... process payment ...
  };

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <h1>Payment</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="paymentMethod">
              <Form.Label>Payment Method:</Form.Label>
              <Form.Control as="select" value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}>
                <option value="stripe">Stripe</option>
                <option value="paypal">PayPal</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Pay Now
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h1>Payment</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Form onSubmit={handleSubmit}>
          <Form.Group controlId="giftCardNumber">
  <Form.Label>Gift Card Number:</Form.Label>
  <Form.Control type="text" value={giftCardNumber} onChange={(event) => setGiftCardNumber(event.target.value)} />
</Form.Group>
<Button variant="primary" type="submit">
  Pay with Gift Card
</Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h1>Payment</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="loyaltyProgramNumber">
              <Form.Label>Loyalty Program Number:</Form.Label>
              <Form.Control type="text" value={loyaltyProgramNumber} onChange={(event) => setLoyaltyProgramNumber(event.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Pay with Loyalty Program
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Payment;