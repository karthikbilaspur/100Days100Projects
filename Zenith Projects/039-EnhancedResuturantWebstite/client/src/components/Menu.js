import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import MenuItems from './MenuItems';
import Pagination from './Pagination';
import FeedbackForm from './FeedbackForm';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [favorites, setFavorites] = useState([]);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    axios.get('/api/menu')
      .then(response => {
        setMenuItems(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setPageNumber(pageNumber);
  };

  const handleFavorite = (itemId) => {
    const favoriteItem = menuItems.find(item => item._id === itemId);
    if (favorites.includes(favoriteItem)) {
      setFavorites(favorites.filter(item => item._id !== itemId));
    } else {
      setFavorites([...favorites, favoriteItem]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // ... send feedback to server ...
  };

  const filteredMenuItems = menuItems.filter(item => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase()) && item.category === category;
  });

  const paginatedMenuItems = filteredMenuItems.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage);

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h1>Menu</h1>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Form>
            <Form.Group controlId="searchTerm">
              <Form.Label>Search:</Form.Label>
              <Form.Control type="text" value={searchTerm} onChange={handleSearch} />
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category:</Form.Label>
              <Form.Control as="select" value={category} onChange={handleCategoryChange}>
                <option value="">All</option>
                <option value="Appetizers">Appetizers</option>
                <option value="Entrees">Entrees</option>
                <option value="Desserts">Desserts</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row>
        <MenuItems menuItems={paginatedMenuItems} handleFavorite={handleFavorite} />
      </Row>
      <Row>
        <Pagination pageNumber={pageNumber} itemsPerPage={itemsPerPage} totalItems={filteredMenuItems.length} handlePageChange={handlePageChange} />
      </Row>
      <Row>
  <FeedbackForm handleSubmit={handleSubmit} feedback={feedback} setFeedback={setFeedback} />
</Row>
</Container>
);
};

export default Menu;