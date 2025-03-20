import React from 'react';


const NextTetrimino = () => {
  const { nextTetrimino } = useContext(GameContext);
  if (!nextTetrimino) return null;
  const { shape } = nextTetrimino;
  return (
    <div className="next-tetrimino">
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


export default NextTetrimino;
