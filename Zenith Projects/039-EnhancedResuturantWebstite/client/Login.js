import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Login = () => {
  const [socialMediaPlatform, setSocialMediaPlatform] = useState(null);

  const handleSocialMediaLogin = (platform) => {
    // ... handle social media login ...
  };

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <h1>Login</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Form>
            <Form.Group controlId="socialMediaPlatform">
              <Form.Label>Social Media Platform:</Form.Label>
              <Form.Control as="select" value={socialMediaPlatform} onChange={(event) => setSocialMediaPlatform(event.target.value)}>
                <option value="facebook">Facebook</option>
                <option value="twitter">Twitter</option>
                <option value="google">Google</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" onClick={() => handleSocialMediaLogin(socialMediaPlatform)}>
              Login with Social Media
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;