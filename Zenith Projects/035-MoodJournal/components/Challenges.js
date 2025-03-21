import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Challenges() {
  const [challenges, setChallenges] = useState(null);

  useEffect(() => {
    axios.get('/api/challenges')
      .then((response) => {
        setChallenges(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCompleteChallenge = (challengeId) => {
    axios.post('/api/complete-challenge', { challengeId })
      .then((response) => {
        setChallenges(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Challenges</h2>
      {challenges && (
        <ul>
          {challenges.map((challenge) => (
            <li key={challenge.id}>
              {challenge.name}
              {challenge.completed ? (
                <span> (Already completed)</span>
              ) : (
                <button onClick={() => handleCompleteChallenge(challenge.id)}>Complete</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Challenges;