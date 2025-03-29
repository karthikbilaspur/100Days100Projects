// src/components/CustomerFeedback.js
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function CustomerFeedback() {
    const [feedback, setFeedback] = useState({});

    const handleFeedback = async (event) => {
        event.preventDefault();
        const response = await fetch('/api/customer-feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(feedback),
        });
        const data = await response.json();
        console.log(data);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Form onSubmit={handleFeedback}>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                value={feedback.name}
                                onChange={(event) => setFeedback({ ...feedback, name: event.target.value })}
                                placeholder="Name"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                type="email"
                                value={feedback.email}
                                onChange={(event) => setFeedback({ ...feedback, email: event.target.value })}
                                placeholder="Email"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                value={feedback.feedback}
                                onChange={(event) => setFeedback({ ...feedback, feedback: event.target.value })}
                                placeholder="Feedback"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit Feedback
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default CustomerFeedback;