import React from 'react';


const GameInfo = () => {
    const { score, lines, level } = useContext(GameContext);
    return (
      <div className="game-info">
        <p>Score: {score}</p>
        <p>Lines: {lines}</p>
        <p>Level: {level}</p>
      </div>
    );
  };
 
  export default GameInfo;
