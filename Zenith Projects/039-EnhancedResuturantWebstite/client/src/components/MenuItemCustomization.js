// src/components/MenuItemCustomization.js
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function MenuItemCustomization() {
    const [customization, setCustomization] = useState({});

    const handleCustomization = async (event) => {
        event.preventDefault();
        const response = await fetch('/api/menu-item-customization', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customization),
        });
        const data = await response.json();
        console.log(data);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Form onSubmit={handleCustomization}>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                value={customization.name}
                                onChange={(event) => setCustomization({ ...customization, name: event.target.value })}
                                placeholder="Name"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                value={customization.description}
                                onChange={(event) => setCustomization({ ...customization, description: event.target.value })}
                                placeholder="Description"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Customize
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default MenuItemCustomization;