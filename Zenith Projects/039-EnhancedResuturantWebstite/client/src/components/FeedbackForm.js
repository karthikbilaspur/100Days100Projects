import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const FeedbackForm = ({ handleSubmit, feedback, setFeedback }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="feedback">
        <Form.Label>Feedback:</Form.Label>
        <Form.Control type="textarea" value={feedback} onChange={(event) => setFeedback(event.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit Feedback
      </Button>
    </Form>
  );
};

export default FeedbackForm;