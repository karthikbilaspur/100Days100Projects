import React from 'react';
import MoodMapping from './MoodMapping';
import MoodForecasting from './MoodForecasting';
import EmotionalAwareness from './EmotionalAwareness';

function MoodTracker() {
  return (
    <div>
      <MoodMapping />
      <MoodForecasting />
      <EmotionalAwareness />
    </div>
  );
}

export default MoodTracker;