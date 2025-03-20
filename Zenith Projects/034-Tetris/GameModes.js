import React from 'react';


const GameModes = () => {
  const { gameMode } = useContext(GameContext);
  return (
    <div className="game-modes">
      <p>Game Mode: {gameMode}</p>
    </div>
  );
};


export default GameModes;
