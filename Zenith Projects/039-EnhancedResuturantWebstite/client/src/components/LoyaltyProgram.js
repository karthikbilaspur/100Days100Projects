// src/components/LoyaltyProgram.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function LoyaltyProgram() {
    return (
        <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Loyalty Program</Card.Title>
                            <Card.Text>
                                Earn points for every purchase and redeem rewards!
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default LoyaltyProgram;