// Contact.js
import React, { useState } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('submitting');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await response.json();
      if (response.ok) {
        setSubmissionStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setError(data.message);
        setSubmissionStatus('error');
      }
    } catch (error) {
      setError('An unexpected error occurred.');
      setSubmissionStatus('error');
    }
  };

  return (
    <div>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Message:
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
        </label>
        {submissionStatus === 'success' && (
          <p>Thank you for your message! We will respond soon.</p>
        )}
        {submissionStatus === 'error' && (
          <p style={{ color: 'red' }}>{error}</p>
        )}
        <button type="submit" disabled={submissionStatus === 'submitting'}>
          {submissionStatus === 'submitting' ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Contact;