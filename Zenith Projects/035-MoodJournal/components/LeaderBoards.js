import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Leaderboard() {
  const [leaders, setLeaders] = useState(null);

  useEffect(() => {
    axios.get('/api/leaders')
      .then((response) => {
        setLeaders(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      {leaders && (
        <ul>
          {leaders.map((leader, index) => (
            <li key={leader.id}>
              {index + 1}. {leader.name} ({leader.points} points)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Leaderboard;