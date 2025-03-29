import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col>
                        <p>&copy; 2023 Restaurant Website</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;