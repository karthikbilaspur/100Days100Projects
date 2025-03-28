// Auth.js
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Auth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('/login', {
        username,
        password,
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      history.push('/dashboard');
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Auth;