import React from 'react';


const AIOpponent = () => {
  const { aiOpponent } = useContext(GameContext);
  return (
    <div className="ai-opponent">
      {aiOpponent && (
        <p>AI Opponent: {aiOpponent.name}</p>
      )}
    </div>
  );
};


export default AIOpponent;
