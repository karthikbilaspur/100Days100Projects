import React from 'react';

const QuizTimer = ({ timeLeft, isRunning }) => {
  const timerClass = timeLeft <= 5 && isRunning? 'timer-critical' : '';

  return (
    <div className={`quiz-timer ${timerClass}`}>
      Time Left: {timeLeft}s
    </div>
  );
};

export default QuizTimer;