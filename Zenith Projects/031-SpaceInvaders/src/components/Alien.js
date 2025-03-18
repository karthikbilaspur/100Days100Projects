import React from 'react';

const Alien = ({ x, y, onCollision }) => {
  return (
    <div className="alien" style={{ top: y, left: x }} onClick={() => onCollision()} />
  );
};

export default Alien;