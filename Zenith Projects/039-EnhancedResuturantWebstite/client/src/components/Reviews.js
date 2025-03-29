import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';

function Reviews() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get('/api/reviews')
            .then(response => {
                setReviews(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Reviews</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Review</th>
                                <th>Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map(review => (
                                <tr key={review._id}>
                                    <td>{review.customerName}</td>
                                    <td>{review.review}</td>
                                    <td>{review.rating}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default Reviews;