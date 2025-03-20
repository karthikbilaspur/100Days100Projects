import React from 'react';


const Leaderboard = () => {
  const { leaderboard } = useContext(GameContext);
  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      {leaderboard.map((entry, i) => (
        <div key={i} className="leaderboard-entry">
          <p>{entry.name}</p>
          <p>{entry.score}</p>
        </div>
      ))}
    </div>
  );
};


export default Leaderboard;
