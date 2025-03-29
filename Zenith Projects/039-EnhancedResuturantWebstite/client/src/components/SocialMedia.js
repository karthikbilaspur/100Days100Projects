// src/components/SocialMedia.js
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function SocialMedia() {
    return (
        <Container>
            <Row>
                <Col>
                    <Button href="https://www.facebook.com" target="_blank">
                        Facebook
                    </Button>
                    <Button href="https://www.twitter.com" target="_blank">
                        Twitter
                    </Button>
                    <Button href="https://www.instagram.com" target="_blank">
                        Instagram
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default SocialMedia;