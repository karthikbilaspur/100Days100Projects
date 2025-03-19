import React from 'react';

const PlayerProfiles = ({ playerProfiles, onUpdate }) => {
  return (
    <div className="player-profiles">
      <h1>Player Profiles</h1>
      <ul>
        {playerProfiles.map((playerProfile, index) => (
          <li key={index}>
            {playerProfile.name}: {playerProfile.wins} wins, {playerProfile.losses} losses
          </li>
        ))}
      </ul>
      <button onClick={() => onUpdate(playerProfiles)}>Update Player Profiles</button>
    </div>
  );
};

export default PlayerProfiles;