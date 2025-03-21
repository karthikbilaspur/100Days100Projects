import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RewardSystem() {
  const [rewards, setRewards] = useState(null);
  const [userRewards, setUserRewards] = useState(null);

  useEffect(() => {
    axios.get('/api/rewards')
      .then((response) => {
        setRewards(response.data);
      })
      .catch((error) => {
    })
    .catch((error) => {
      console.error(error);
    });
}, []);

const handleClaimReward = (rewardId) => {
  axios.post('/api/claim-reward', { rewardId })
    .then((response) => {
      setUserRewards(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

return (
  <div>
    <h2>Reward System</h2>
    {rewards && (
      <ul>
        {rewards.map((reward) => (
          <li key={reward.id}>
            {reward.name} ({reward.points} points)
            {userRewards.includes(reward.id) ? (
              <span> (Already claimed)</span>
            ) : (
              <button onClick={() => handleClaimReward(reward.id)}>Claim</button>
            )}
          </li>
        ))}
      </ul>
    )}
  </div>
);
}

export default RewardSystem;