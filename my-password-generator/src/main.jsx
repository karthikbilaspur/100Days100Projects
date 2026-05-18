import React from 'react';
import ReactDOM from 'react-dom/client';
import PasswordGenerateContainer from './PasswordGenerateContainer'; // Adjust if your main component is named App.jsx
import './App.css'; // Import your global CSS file

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PasswordGenerateContainer />
  </React.StrictMode>,
);