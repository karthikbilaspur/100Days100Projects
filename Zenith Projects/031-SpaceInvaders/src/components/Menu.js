import React from 'react';
import './Menu.css';

const Menu = ({ onStartGame }) => {
  return (
    <div className="menu-container">
      <h1>Space Invaders</h1>
      <button onClick={onStartGame}>Start Game</button>
      <div className="high-score-container">
        <div>High Score: {localStorage.getItem('highScore')}</div>
      </div>
    </div>
  );
};

export default Menu;