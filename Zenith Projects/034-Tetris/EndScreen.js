import React from 'react';


const EndScreen = () => {
  return (
    <div className="end-screen">
      <h1>Game Over!</h1>
      <p>Your final score is: {localStorage.getItem('highScore')}</p>
      <button onClick={() => window.location.hash = '#start'}>Play Again</button>
    </div>
  );
};


export default EndScreen;
