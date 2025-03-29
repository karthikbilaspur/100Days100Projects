import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  return (
    <Container>
      <Row>
        <Col md={6}>
          <img src="https://source.unsplash.com/600x400/?restaurant" alt="Restaurant" />
        </Col>
        <Col md={6}>
          <h1>Welcome to our restaurant!</h1>
          <p>We serve delicious food and drinks.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;