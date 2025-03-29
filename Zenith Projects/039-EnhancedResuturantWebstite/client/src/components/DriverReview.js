// src/components/DriverReview.js
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Rating } from 'react-rating';

function DriverReview() {
    const [review, setReview] = useState({});

    const handleReview = async (event) => {
        event.preventDefault();
        const response = await fetch('/api/driver-review', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(review),
        });
        const data = await response.json();
        console.log(data);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Form onSubmit={handleReview}>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                value={review.driverName}
                                onChange={(event) => setReview({ ...review, driverName: event.target.value })}
                                placeholder="Driver Name"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Rating
                                initialRating={review.rating}
                                onChange={(rating) => setReview({ ...review, rating })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                value={review.review}
                                onChange={(event) => setReview({ ...review, review: event.target.value })}
                                placeholder="Review"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit Review
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default DriverReview;