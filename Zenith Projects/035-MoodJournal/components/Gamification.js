import React from 'react';
import RewardSystem from './RewardSystem';
import Leaderboard from './Leaderboard';
import Challenges from './Challenges';

function Gamification() {
  return (
    <div>
      <RewardSystem />
      <Leaderboard />
      <Challenges />
    </div>
  );
}

export default Gamification;