import React from 'react';

const PowerUp = ({ x, y, onCollection }) => {
  return (
    <div className="power-up" style={{ top: y, left: x }} onClick={() => onCollection()} />
  );
};

export default PowerUp;