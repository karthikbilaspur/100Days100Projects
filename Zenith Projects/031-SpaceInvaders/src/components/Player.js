import React from 'react';
import './Player.css';

const Player = ({ x, y, onMovement }) => {
  return (
    <div className="player" style={{ top: y, left: x }}>
      <button className="move-button" onClick={() => onMovement({ x: -10, y: 0 })}>
        Left
      </button>
      <button className="move-button" onClick={() => onMovement({ x: 10, y: 0 })}>
        Right
      </button>
      <button className="move-button" onClick={() => onMovement({ x: 0, y: -10 })}>
        Up
      </button>
      <button className="move-button" onClick={() => onMovement({ x: 0, y: 10 })}>
        Down
      </button>
    </div>
  );
};

export default Player;