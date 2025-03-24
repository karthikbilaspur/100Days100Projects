import React from 'react';
import './Display.css';

const Display = ({ input, result }) => {
  return (
    <div className="display">
      <p className="input">{input}</p>
      <p className="result">{result}</p>
    </div>
  );
};

export default Display;