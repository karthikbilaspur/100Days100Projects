import React from 'react';

const QuestionDisplay = ({
  question,
  selectedAnswer,
  onAnswerSelected,
  onHintUsed,
  hintAvailable,
  showHint,
  isReviewMode, // New prop
  correctAnswer, // New prop
  optionsDisabled // New prop
}) => {
  return (
    <div className="question-display">
      <p className="question-difficulty">Difficulty: {question.difficulty.toUpperCase()}</p>
      <h2 className="question-text">{question.question}</h2>
      <div className="options-container">
        {question.options.map((option, index) => {
          const isCorrect = isReviewMode && option === correctAnswer;
          const isIncorrectAndSelected = isReviewMode && selectedAnswer === option && selectedAnswer!== correctAnswer;

          return (
            <button
              key={index}
              className={`option-button ${selectedAnswer === option? 'selected' : ''} ${isCorrect? 'correct-answer' : ''} ${isIncorrectAndSelected? 'incorrect-answer' : ''}`}
              onClick={() => onAnswerSelected(question.id, option)}
              disabled={optionsDisabled}
            >
              {option}
            </button>
          );
        })}
      </div>
      <div className="hint-section">
        <button
          onClick={() => onHintUsed(question.id)}
          disabled={!hintAvailable || isReviewMode} // Disable hint in review mode
          className="hint-button secondary"
        >
          {showHint? 'Hint Used' : 'Use Hint'} ({hintAvailable? 'Available' : 'None Left'})
        </button>
        {showHint && <p className="hint-text">{question.hint}</p>}
      </div>
      {isReviewMode && selectedAnswer && (
        <div className="review-feedback">
          {selectedAnswer === correctAnswer? (
            <p className="feedback-correct">You answered correctly!</p>
          ) : (
            <>
              <p className="feedback-incorrect">Your answer: <strong>{selectedAnswer}</strong> was incorrect.</p>
              <p className="feedback-correct">Correct answer: <strong>{correctAnswer}</strong></p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionDisplay;
