import React from 'react';


const StartScreen = () => {
  return (
    <div className="start-screen">
      <h1>Tetris</h1>
      <button onClick={() => window.location.hash = '#game'}>Start Game</button>
    </div>
  );
};


export default StartScreen;