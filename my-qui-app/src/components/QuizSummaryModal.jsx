import React from 'react';

const QuizSummaryModal = ({ allQuestions, userAnswers, onClose, onJumpToQuestion, currentQuestionIndex }) => {
  return (
    <div className="quiz-summary-overlay">
      <div className="quiz-summary-content">
        <h2>Quiz Summary</h2>
        <div className="summary-list-container">
          {allQuestions.map((q, index) => {
            const userAnswer = userAnswers[q.id];
            const isAnswered =!!userAnswer;
            const isCurrent = index === currentQuestionIndex;

            return (
              <div
                key={q.id}
                className={`summary-item ${isAnswered? 'answered' : 'unanswered'} ${isCurrent? 'current-question' : ''}`}
                onClick={() => onJumpToQuestion(index)}
              >
                <p className="summary-question-text">{index + 1}. {q.question}</p>
                <p className="summary-answer-status">
                  {isAnswered? `Answered: ${userAnswer}` : 'Unanswered'}
                </p>
              </div>
            );
          })}
        </div>
        <button onClick={onClose} className="close-summary-button">Close Summary</button>
      </div>
    </div>
  );
};

export default QuizSummaryModal;