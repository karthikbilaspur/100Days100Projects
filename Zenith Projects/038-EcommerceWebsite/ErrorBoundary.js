// ErrorBoundary.js
import React, { useState, useEffect } from 'react';

const ErrorBoundary = ({ children }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleErrors = (error) => {
      setError(error);
    };
    window.addEventListener('error', handleErrors);
    return () => window.removeEventListener('error', handleErrors);
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return children;
};

export default ErrorBoundary;