import React from 'react';

// Props will now include onTopicSelect and an array of topics
const StartScreen = ({ onTopicSelect, topics }) => {
  return (
    <div className="start-screen">
      <h1>Welcome to the Quiz Challenge!</h1>
      <p>Test your knowledge with 30 challenging questions per topic.</p>
      <div className="quiz-rules">
        <h3>Rules:</h3>
        <ul>
          <li>10 Easy Questions (20s, 2 points)</li>
          <li>10 Medium Questions (40s, 3 points)</li>
          <li>10 Hard Questions (60s, 5 points)</li>
          <li>You have 5 hints in total.</li>
          <li>Time runs out? Automatic next question!</li>
        </ul>
      </div>
      <p className="choose-topic-text">Choose a topic to begin:</p>
      <div className="topic-selection-buttons">
        {topics.map(topic => (
          <button
            key={topic}
            onClick={() => onTopicSelect(topic)}
            className="topic-button"
          >
            {topic.charAt(0).toUpperCase() + topic.slice(1)} Quiz
          </button>
        ))}
      </div>
    </div>
  );
};

export default StartScreen;