import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Renamed from PasswordGeneratorContainer to App
import './App.css'; // Import your global CSS file

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);