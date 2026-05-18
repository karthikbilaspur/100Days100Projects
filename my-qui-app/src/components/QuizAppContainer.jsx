import React, { useState, useEffect, useCallback } from 'react';
import QuestionDisplay from './components/QuestionDisplay';
import QuizNavigation from './components/QuizNavigation';
import QuizTimer from './components/QuizTimer';
import ResultModal from './components/ResultModal';
import StartScreen from './components/StartScreen';
import ThemeToggle from './components/ThemeToggle';

// Mapping for dynamic imports of quiz data
const quizDataMap = {
  html: () => import('./data/html.json'),
  css: () => import('./data/css.json'),
  python: () => import('./data/python.json'),
  php: () => import('./data/php.json'),
  javascript: () => import('./data/javascript.json'),
  java: () => import('./data/java.json'),
};

const QuizAppContainer = ({ toggleTheme, currentTheme }) => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { questionId: selectedOption }
  const [hintsUsed, setHintsUsed] = useState({}); // { questionId: true }
  const [hintCount, setHintCount] = useState(5); // Total hints available
  const [quizScore, setQuizScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0); // Time left for current question
  const [timerRunning, setTimerRunning] = useState(false); // To control QuizTimer
  const [selectedTopic, setSelectedTopic] = useState(null); // NEW: To store the chosen quiz topic
  const [loadingQuestions, setLoadingQuestions] = useState(false); // NEW: For loading state

  const QUESTION_POINTS = { easy: 2, medium: 3, hard: 5 };
  const QUESTION_TIMES = { easy: 20, medium: 40, hard: 60 };

  // Helper for shuffling array (memoized for stability)
  const shuffleArray = useCallback((array) => {
    return [...array].sort(() => Math.random() - 0.5);
  }, []);

  // Calculate final score (memoized)
  const calculateFinalScore = useCallback(() => {
    let score = 0;
    allQuestions.forEach(q => {
      if (userAnswers[q.id] === q.answer) {
        score += QUESTION_POINTS[q.difficulty];
      }
    });
    setQuizScore(score);
    setQuizFinished(true);
    setTimerRunning(false);
  }, [allQuestions, userAnswers, QUESTION_POINTS]);

  // Handle next question logic (memoized)
  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      calculateFinalScore(); // Auto-submit on last question's next
    }
  }, [currentQuestionIndex, allQuestions.length, calculateFinalScore]);

  // Handle previous question logic (memoized)
  const handlePrevQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    }
  }, [currentQuestionIndex]);

  // Handle time up (memoized)
  const handleTimeUp = useCallback(() => {
    handleNextQuestion();
  }, [handleNextQuestion]);

  // Effect to load questions when selectedTopic changes
  useEffect(() => {
    if (selectedTopic) {
      setLoadingQuestions(true); // Indicate loading
      quizDataMap[selectedTopic]() // Dynamically import the JSON file
      .then(module => {
          const loadedQuestions = module.default; // Access the default export
          const easyQuestions = shuffleArray(loadedQuestions.filter(q => q.difficulty === 'easy')).slice(0, 10);
          const mediumQuestions = shuffleArray(loadedQuestions.filter(q => q.difficulty === 'medium')).slice(0, 10);
          const hardQuestions = shuffleArray(loadedQuestions.filter(q => q.difficulty === 'hard')).slice(0, 10);

          const shuffledQuizQuestions = shuffleArray([...easyQuestions,...mediumQuestions,...hardQuestions]);

          setAllQuestions(shuffledQuizQuestions);
          setCurrentQuestionIndex(0);
          setUserAnswers({});
          setHintsUsed({});
          setHintCount(5);
          setQuizScore(0);
          setQuizFinished(false);
          // setTimerRunning(false); // Timer starts with quizStarted=true below
          if (shuffledQuizQuestions.length > 0) {
            setTimeLeft(QUESTION_TIMES[shuffledQuizQuestions[0].difficulty]);
          }
          setLoadingQuestions(false); // Done loading
          setQuizStarted(true); // Start the quiz after questions are loaded
        })
      .catch(error => {
          console.error("Failed to load quiz data:", error);
          setLoadingQuestions(false);
          // Handle error, e.g., display an error message to the user
        });
    }
    // Cleanup function if needed, for instance if a request could be cancelled
    return () => {
      // If you had an AbortController for fetch, you'd abort it here
    };
  }, [selectedTopic, shuffleArray, QUESTION_TIMES]); // Re-run when selectedTopic changes

  // Timer countdown logic
  useEffect(() => {
    if (!quizStarted || quizFinished || loadingQuestions) { // Added loadingQuestions
      setTimerRunning(false);
      return;
    }

    if (timeLeft <= 0) {
      handleTimeUp(); // Call handleTimeUp if time runs out
      return;
    }

    setTimerRunning(true);
    const timer = setTimeout(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, quizStarted, quizFinished, handleTimeUp, loadingQuestions]); // Added loadingQuestions to dependencies

  // Reset timer when question changes
  useEffect(() => {
    if (quizStarted &&!quizFinished && allQuestions.length > 0 && currentQuestionIndex < allQuestions.length) {
      const currentQ = allQuestions[currentQuestionIndex];
      setTimeLeft(QUESTION_TIMES[currentQ.difficulty]);
    }
  }, [currentQuestionIndex, quizStarted, quizFinished, allQuestions, QUESTION_TIMES]);

  // NEW: Handler for topic selection from StartScreen
  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    // The useEffect above will handle loading the questions and starting the quiz
  };

  const handleAnswerSelected = (questionId, selectedOption) => {
    setUserAnswers(prevAnswers => ({
   ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const handleUseHint = (questionId) => {
    if (hintCount > 0 &&!hintsUsed[questionId]) {
      setHintCount(prev => prev - 1);
      setHintsUsed(prev => ({...prev, [questionId]: true }));
    }
  };

  const handleRestartQuiz = useCallback(() => {
    // Reset states to initial values
    setAllQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setHintsUsed({});
    setHintCount(5);
    setQuizScore(0);
    setQuizStarted(false);
    setQuizFinished(false);
    setTimerRunning(false);
    setSelectedTopic(null); // Reset selected topic to go back to StartScreen
    // No need to re-shuffle here, as setting selectedTopic(null)
    // will make the app render StartScreen, and when a new topic
    // is selected, the useEffect will load and shuffle.
  }, []);

  const currentQuestion = allQuestions[currentQuestionIndex];
  const totalQuestions = allQuestions.length;

  // Render loading screen if questions are being loaded
  if (loadingQuestions) {
    return (
      <div className="quiz-loading-screen">
        <h2>Loading Quiz Questions...</h2>
        <div className="loader"></div> {/* Add a CSS loader later */}
      </div>
    );
  }

  // Show StartScreen if no topic is selected yet
  if (!quizStarted || selectedTopic === null) { // Condition to show StartScreen
    return <StartScreen onTopicSelect={handleTopicSelect} topics={Object.keys(quizDataMap)} />;
  }

  if (quizFinished) {
    let totalPossibleScore = 0;
    allQuestions.forEach(q => totalPossibleScore += QUESTION_POINTS[q.difficulty]);
    const percentage = (quizScore / totalPossibleScore) * 100;

    let grade;
    if (percentage < 30) grade = 'Fail';
    else if (percentage < 50) grade = 'Very Poor';
    else if (percentage < 65) grade = 'Poor';
    else if (percentage < 75) grade = 'Average';
    else if (percentage < 85) grade = 'Good';
    else if (percentage < 95) grade = 'Very Good';
    else grade = 'Excellent';

    return (
      <ResultModal
        score={quizScore}
        totalPossibleScore={totalPossibleScore}
        grade={grade}
        onRestartQuiz={handleRestartQuiz}
      />
    );
  }

  return (
    <div className="quiz-app-container">
      <div className="quiz-header">
        <h1 className="quiz-title">Quiz: {selectedTopic.toUpperCase()}</h1> {/* Display selected topic */}
        <div className="quiz-header-right">
          {currentQuestion && (
            <QuizTimer
              key={currentQuestion.id} // Key to re-mount timer when question changes
              timeLeft={timeLeft}
              isRunning={timerRunning}
            />
          )}
          <div className="hint-counter">Hints Left: {hintCount}</div>
          <ThemeToggle toggleTheme={toggleTheme} currentTheme={currentTheme} />
        </div>
      </div>

      <p className="question-counter">Question {currentQuestionIndex + 1} of {totalQuestions}</p>

      {currentQuestion? (
        <>
          <QuestionDisplay
            question={currentQuestion}
            selectedAnswer={userAnswers[currentQuestion.id]}
            onAnswerSelected={handleAnswerSelected}
            onHintUsed={() => handleUseHint(currentQuestion.id)}
            hintAvailable={hintCount > 0 &&!hintsUsed[currentQuestion.id]}
            showHint={hintsUsed[currentQuestion.id]}
            optionsDisabled={!!userAnswers[currentQuestion.id]}
          />
          <QuizNavigation
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
            onNext={handleNextQuestion}
            onPrev={handlePrevQuestion}
            onSubmitQuiz={calculateFinalScore}
          />
        </>
      ) : (
        <p>Loading question...</p>
      )}
    </div>
  );
};

export default QuizAppContainer;