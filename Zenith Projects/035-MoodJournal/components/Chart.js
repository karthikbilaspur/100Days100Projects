import React from 'react';

const Chart = ({ happinessCount, sadnessCount, angerCount, neutralityCount }) => {
  return (
    <div>
      <h2>Chart</h2>
      <ul>
        <li>Happiness: {happinessCount}</li>
        <li>Sadness: {sadnessCount}</li>
        <li>Neutrality: {neutralityCount}</li>
      </ul>
    </div>
  );
};

export default Chart;