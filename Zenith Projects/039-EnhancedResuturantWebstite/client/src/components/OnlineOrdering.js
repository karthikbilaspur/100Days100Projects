// src/components/OnlineOrdering.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function OnlineOrdering() {
    return (
        <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Online Ordering</Card.Title>
                            <Card.Text>
                                Order now and get 10% off your first purchase!
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default OnlineOrdering;