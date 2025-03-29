import React from 'react';
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';

function Home() {
    return (
        <Container>
            <Row>
                <Col>
                    <Jumbotron>
                        <h1>Welcome to our restaurant!</h1>
                        <p>We serve the best food in town!</p>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;