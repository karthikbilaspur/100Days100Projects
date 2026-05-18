import React from 'react';

const ResultModal = ({
  score,
  totalPossibleScore,
  grade,
  onRestartQuiz,
  allQuestions, // New prop
  userAnswers, // New prop
  QUESTION_POINTS // New prop
}) => {
  const percentage = ((score / totalPossibleScore) * 100).toFixed(2);

  const getGradeClass = () => {
    if (percentage < 30) return 'grade-fail';
    if (percentage < 50) return 'grade-very-poor';
    if (percentage < 65) return 'grade-poor';
    if (percentage < 75) return 'grade-average';
    if (percentage < 85) return 'grade-good';
    if (percentage < 95) return 'grade-very-good';
    return 'grade-excellent';
  };

  return (
    <div className="result-modal-overlay">
      <div className="result-modal-content">
        <h2>Quiz Results</h2>
        <p>Your Score: <strong>{score} / {totalPossibleScore}</strong></p>
        <p>Percentage: <strong>{percentage}%</strong></p>
        <p className={`your-grade ${getGradeClass()}`}>Grade: <strong>{grade}</strong></p>

        <div className="quiz-review-details">
          <h3>Detailed Review:</h3>
          {allQuestions.map((q, index) => {
            const userAnswer = userAnswers[q.id];
            const isCorrect = userAnswer === q.answer;
            const pointsAwarded = isCorrect? QUESTION_POINTS[q.difficulty] : 0;

            return (
              <div key={q.id} className={`review-item ${isCorrect? 'review-correct' : 'review-incorrect'}`}>
                <p><strong>{index + 1}. {q.question}</strong> ({pointsAwarded} points)</p>
                <p>Your Answer: <span className={isCorrect? 'text-green' : 'text-red'}>{userAnswer || 'No answer'}</span></p>
                {!isCorrect && <p>Correct Answer: <span className="text-green">{q.answer}</span></p>}
              </div>
            );
          })}
        </div>

        <button onClick={onRestartQuiz} className="restart-button">Start New Quiz</button>
      </div>
    </div>
  );
};

export default ResultModal;