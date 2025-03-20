import React from 'react';


const LevelingSystem = () => {
  const { level, experience } = useContext(GameContext);
  return (
    <div className="leveling-system">
      <p>Level: {level}</p>
      <p>Experience: {experience}</p>
    </div>
  );
};


export default LevelingSystem;
