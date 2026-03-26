import React from 'react';

const QuizNavigation = ({
  currentQuestionIndex,
  totalQuestions,
  onNext,
  onPrev,
  onSubmitQuiz,
  onShowSummary // New prop
}) => {
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  return (
    <div className="quiz-navigation">
      <button onClick={onPrev} disabled={isFirstQuestion} className="nav-button secondary">
        Previous Question
      </button>

      <button onClick={onShowSummary} className="nav-button summary-button secondary">
        Quiz Summary
      </button>

      {isLastQuestion? (
        <button onClick={onSubmitQuiz} className="nav-button submit-button">
          Submit Quiz
        </button>
      ) : (
        <button onClick={onNext} className="nav-button">
          Next Question
        </button>
      )}
    </div>
  );
};

export default QuizNavigation;