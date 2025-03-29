// src/components/SocialSharing.js
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function SocialSharing() {
    const handleShare = async (platform) => {
        const url = 'https://example.com';
        const title = 'Example Restaurant';
        const description = 'Check out our restaurant!';

        if (platform === 'facebook') {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        } else if (platform === 'twitter') {
            window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}&via=example`, '_blank');
        } else if (platform === 'linkedin') {
            window.open(`https://www.linkedin.com/sharing/share?url=${url}&title=${title}&summary=${description}`, '_blank');
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Button variant="primary" onClick={() => handleShare('facebook')}>
                        Share on Facebook
                    </Button>
                    <Button variant="primary" onClick={() => handleShare('twitter')}>
                        Share on Twitter
                    </Button>
                    <Button variant="primary" onClick={() => handleShare('linkedin')}>
                        Share on LinkedIn
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default SocialSharing;