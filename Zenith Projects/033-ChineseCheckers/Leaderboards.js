import React from 'react';

const Leaderboards = ({ leaderboards, onUpdate }) => {
  return (
    <div className="leaderboards">
      <h1>Leaderboards</h1>
      <ul>
        {leaderboards.map((leaderboard, index) => (
          <li key={index}>
            {leaderboard.name}: {leaderboard.score}
          </li>
        ))}
      </ul>
      <button onClick={() => onUpdate(leaderboards)}>Update Leaderboards</button>
    </div>
  );
};

export default Leaderboards;