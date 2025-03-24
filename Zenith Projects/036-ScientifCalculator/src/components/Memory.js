import React from 'react';
import './Memory.css';

const Memory = ({ memory }) => {
  return (
    <div className="memory">
      <p>Memory: {memory}</p>
    </div>
  );
};

export default Memory;