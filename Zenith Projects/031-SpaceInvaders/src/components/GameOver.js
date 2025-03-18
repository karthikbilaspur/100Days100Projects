import React from 'react';

const GameOver = () => {
  return (
    <div>
      <h1>Game Over!</h1>
      <p>Your final score is: {localStorage.getItem('highScore')}</p>
      <button onClick={() => window.location.reload()}>Play Again</button>
    </div>
  );
};

export default GameOver;