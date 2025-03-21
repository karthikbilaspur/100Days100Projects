import React, { useState } from 'react';

function EmotionalAwareness() {
  const [exercise, setExercise] = useState(null);

  const handleStartExercise = () => {
    setExercise({
      id: 1,
      title: 'Body Scan',
      instructions: 'Lie down or sit comfortably, and bring your attention to different parts of your body, starting from your toes and moving up to the top of your head.',
    });
  };

  return (
    <div>
      <h2>Emotional Awareness Exercises</h2>
      {exercise && (
        <div>
          <h3>{exercise.title}</h3>
          <p>{exercise.instructions}</p>
        </div>
      )}
      <button onClick={handleStartExercise}>Start Exercise</button>
    </div>
  );
}

export default EmotionalAwareness;