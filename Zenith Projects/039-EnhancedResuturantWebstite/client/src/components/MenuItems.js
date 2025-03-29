import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

const MenuItems = ({ menuItems, handleFavorite }) => {
  return (
    <Container>
      <Row>
        {menuItems.map((item, index) => (
          <Col md={4} key={index}>
            <Image src={item.image} alt={item.name} />
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            <Button variant="primary" onClick={() => handleFavorite(item._id)}>
              Favorite
            </Button>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MenuItems;