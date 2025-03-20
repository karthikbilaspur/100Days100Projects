import React from 'react';

const Tetrimino = () => {
  const { currentTetrimino } = useContext(GameContext);
  if (!currentTetrimino) return null;
  const { x, y, shape } = currentTetrimino;
  return (
    <div className="tetrimino" style={{ left: `${x * 20}px`, top: `${y * 20}px` }}>
      {shape.map((row, i) => (
        <div key={i} className="row">
          {row.map((cell, j) => (
            <div key={j} className={`cell ${cell === 1 ? 'solid' : ''}`}></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Tetrimino;

