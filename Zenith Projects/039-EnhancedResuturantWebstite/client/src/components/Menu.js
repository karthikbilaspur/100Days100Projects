import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Form, Button  } from 'react-bootstrap';
import axios from 'axios';
import { Rating } from 'react-rating';

function Menu() {
    const [searchTerm, setSearchTerm] = useState('');
    const [menuItems, setMenuItems] = useState([]);
    const [rating, setRating] = useState(0);


    const handleSearch = async (event) => {
        event.preventDefault();
        const response = await fetch(`/api/menu?search=${searchTerm}`);
        const data = await response.json();
        setMenuItems(data);
    };
    
    const handleRating = (rating) => {
        setRating(rating);
    };

    
    useEffect(() => {
        axios.get('/api/menu')
            .then(response => {
                setMenuItems(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Menu</h1>
                    {menuItems.map(item => (
                        <div key={item._id}>
                            <Image src={item.image} loading="lazy" />
                            <h2>{item.name}</h2>
                            <p>{item.description}</p>
                            <p>{item.price}</p>
                        </div>
                    ))}
                </Col>
            </Row>
        </Container>
    );
    return (
        <Container>
            <Row>
                <Col>
                    <Form onSubmit={handleSearch}>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                placeholder="Search for menu items"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Search
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    {menuItems.map((item) => (
                        <div key={item._id}>
                            <h2>{item.name}</h2>
                            <p>{item.description}</p>
                            <p>{item.price}</p>
                        </div>
                    ))}
                </Col>
            </Row>
        </Container>
    );
   

return (
    <Container>
        <Row>
            <Col>
                {menuItems.map((item) => (
                    <div key={item._id}>
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                        <p>{item.price}</p>
                        <Rating
                            initialRating={item.rating}
                            onChange={handleRating}
                        />
                    </div>
                ))}
            </Col>
        </Row>
    </Container>
);
}



export default Menu;