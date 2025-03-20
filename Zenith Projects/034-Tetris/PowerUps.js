import React from 'react';


const PowerUps = () => {
  const { powerUps } = useContext(GameContext);
  return (
    <div className="power-ups">
      {powerUps.map((powerUp, i) => (
        <div key={i} className="power-up">
          {powerUp.name}
        </div>
      ))}
    </div>
  );
};


export default PowerUps;