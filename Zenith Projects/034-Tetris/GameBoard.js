import React from 'react';


const GameBoard = () => {
  const { board } = useContext(GameContext);
  return (
    <div className="game-board">
      {board.map((row, i) => (
        <div key={i} className="row">
          {row.map((cell, j) => (
            <div key={j} className={`cell ${cell === 1 ? 'solid' : ''}`}></div>
          ))}
        </div>
      ))}
    </div>
  );
};


export default GameBoard;
