const quizData = [
    {
        question: "What does CSS stand for?",
        options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
        answer: "Cascading Style Sheets",
        hint: "It's a style sheet language used for styling web pages."
    },
    {
        question: "Which CSS property is used to set the background color of an element?",
        options: ["background-color", "color", "background-image", "text-color"],
        answer: "background-color",
        hint: "It's used to set the background color of an element."
    },
    {
        question: "What is the purpose of the CSS box model?",
        options: ["To define the layout of a web page", "To style the appearance of an element", "To define the structure of an HTML document", "To determine the size and position of an element"],
        answer: "To determine the size and position of an element",
        hint: "It defines how element dimensions (content, padding, border, margin) are calculated."
    },
    {
        question: "Which CSS selector is used to select all elements of a particular class?",
        options: [".class", "#id", "tagname", "*"],
        answer: ".class",
        hint: "It starts with a dot (.)."
    },
    {
        question: "What is the difference between inline and block-level elements in CSS?",
        options: ["Inline elements take up the full width of their parent, while block-level elements do not", "Inline elements do not take up the full width of their parent, while block-level elements do", "Inline elements are used for layout, while block-level elements are used for styling", "Inline elements are used for styling, while block-level elements are used for layout"],
        answer: "Inline elements do not take up the full width of their parent, while block-level elements do",
        hint: "Think about how they behave with surrounding content and their default width."
    },
    {
        question: "How do you add a comment in CSS?",
        options: ["/* comment */", "// comment", "# comment", "<!-- comment -->"],
        answer: "/* comment */",
        hint: "It's similar to comments in C++ or Java, but with asterisks."
    },
    {
        question: "What is the purpose of the CSS z-index property?",
        options: ["To set the background color of an element", "To set the position of an element", "To determine the stacking order of elements", "To set the font size of an element"],
        answer: "To determine the stacking order of elements",
        hint: "It controls which element appears on top when elements overlap."
    },
    {
        question: "Which CSS property is used to set the font size of an element?",
        options: ["font-size", "text-size", "font-style", "text-style"],
        answer: "font-size",
        hint: "It literally has 'font' and 'size' in its name."
    },
    {
        question: "What is the purpose of the CSS float property?",
        options: ["To set the position of an element", "To determine the stacking order of elements", "To allow an element to float to the left or right of its parent", "To set the background color of an element"],
        answer: "To allow an element to float to the left or right of its parent",
        hint: "It's often used for image placement or creating column layouts."
    },
    {
        question: "Which CSS property is used to set the opacity of an element?",
        options: ["opacity", "transparency", "visibility", "alpha"],
        answer: "opacity",
        hint: "It controls how transparent an element is."
    }
];

// --- State Management ---
const quizState = {
    currentQuestionIndex: 0,
    score: 0,
    timer: 60, // 1 minute per quiz session
    intervalId: null,
    answeredCorrectly: false, // Track if current question was answered correctly
    hasHintBeenUsed: false,
    quizActive: false // To control quiz flow
};

// --- DOM Elements ---
const startSection = document.getElementById("start-section");
const quizSection = document.getElementById("quiz-section");
const resultsSection = document.getElementById("results-section");

const startQuizBtn = document.getElementById("start-quiz-btn");
const questionElement = document.getElementById("current-question");
const timeLeftSpan = document.getElementById("time-left");
const scoreDisplay = document.getElementById("current-score");
const progressBar = document.getElementById("progress-bar");
const questionCountDisplay = document.getElementById("question-count-display");
const optionsList = document.getElementById("options");
const feedbackArea = document.getElementById("feedback-area");
const hintBtn = document.getElementById("hint-btn");
const hintText = document.getElementById("hint-text");
const nextQuestionBtn = document.getElementById("next-question-btn");
const finalScoreDisplay = document.getElementById("final-score");
const scoreValueSpan = document.getElementById("score-value");
const totalQuestionsSpan = document.getElementById("total-questions");
const playAgainBtn = document.getElementById("play-again-btn");
const viewLeaderboardBtn = document.getElementById("view-leaderboard-btn");

// --- Utility Functions ---

/**
 * Shows a specific section and hides others.
 * @param {HTMLElement} sectionToShow - The section to display.
 */
function showSection(sectionToShow) {
    [startSection, quizSection, resultsSection].forEach(section => {
        section.style.display = 'none'; // Hide all
        section.classList.remove('active'); // Remove active class for transitions
        section.setAttribute('aria-hidden', 'true'); // Hide from screen readers
    });
    sectionToShow.style.display = 'block'; // Show target section
    sectionToShow.classList.add('active'); // Add active class for transitions
    sectionToShow.setAttribute('aria-hidden', 'false'); // Show to screen readers
    sectionToShow.focus(); // Focus the newly shown section for accessibility
}

/**
 * Resets quiz state variables to their initial values.
 */
function resetQuizState() {
    quizState.currentQuestionIndex = 0;
    quizState.score = 0;
    quizState.timer = 60;
    quizState.answeredCorrectly = false;
    quizState.hasHintBeenUsed = false;
    quizState.quizActive = false;
    clearInterval(quizState.intervalId); // Ensure any running timer is stopped
}

/**
 * Initializes the quiz display and starts the timer.
 */
function startQuiz() {
    resetQuizState();
    quizState.quizActive = true;
    showSection(quizSection);
    renderQuestion();
    updateScoreDisplay();
    updateProgressBarAndCount();
    quizState.intervalId = setInterval(updateTimer, 1000);
    nextQuestionBtn.disabled = true; // Disable next button until answer is chosen
}

/**
 * Renders the current question and its options to the UI.
 */
function renderQuestion() {
    if (quizState.currentQuestionIndex >= quizData.length) {
        endQuiz();
        return;
    }

    const currentQuizItem = quizData[quizState.currentQuestionIndex];
    questionElement.textContent = currentQuizItem.question;
    questionElement.setAttribute('aria-label', `Question ${quizState.currentQuestionIndex + 1}: ${currentQuizItem.question}`);

    optionsList.innerHTML = "";
    optionsList.setAttribute('aria-labelledby', 'current-question'); // Associate options with the question

    // Shuffle options for variety
    const shuffledOptions = [...currentQuizItem.options].sort(() => Math.random() - 0.5);

    shuffledOptions.forEach((optionText, index) => {
        const li = document.createElement("li");
        li.textContent = optionText;
        li.classList.add('option-item');
        li.setAttribute('role', 'radio'); // ARIA role for radio button
        li.setAttribute('aria-checked', 'false'); // Initial state
        li.setAttribute('tabindex', '0'); // Make options focusable
        li.setAttribute('id', `option-${index}`); // Unique ID for each option
        optionsList.appendChild(li);
    });

    feedbackArea.textContent = ''; // Clear previous feedback
    hintText.style.display = 'none'; // Hide hint
    quizState.hasHintBeenUsed = false; // Reset hint state for new question
    hintBtn.disabled = false; // Enable hint button
    nextQuestionBtn.disabled = true; // Next button disabled until answer
    optionsList.classList.remove('answered'); // Enable clicking options again
    optionsList.focus(); // Focus the options list for keyboard users
    updateProgressBarAndCount();
}

/**
 * Updates the timer display and ends the quiz if time runs out.
 */
function updateTimer() {
    quizState.timer--;
    timeLeftSpan.textContent = quizState.timer;

    if (quizState.timer <= 10) {
        timeLeftSpan.style.color = 'red'; // Visual warning
    } else {
        timeLeftSpan.style.color = '';
    }

    if (quizState.timer <= 0) {
        endQuiz();
    }
}

/**
 * Updates the score display in the quiz section.
 */
function updateScoreDisplay() {
    scoreDisplay.textContent = quizState.score;
}

/**
 * Updates the progress bar and question count display.
 */
function updateProgressBarAndCount() {
    progressBar.value = quizState.currentQuestionIndex + 1;
    progressBar.max = quizData.length;
    questionCountDisplay.textContent = `Question ${quizState.currentQuestionIndex + 1} of ${quizData.length}`;
    progressBar.setAttribute('aria-valuenow', quizState.currentQuestionIndex + 1);
    progressBar.setAttribute('aria-valuemax', quizData.length);
    progressBar.setAttribute('aria-label', `Question ${quizState.currentQuestionIndex + 1} of ${quizData.length}`);
}

/**
 * Checks the user's selected answer against the correct answer.
 * @param {string} userAnswer - The text of the option selected by the user.
 * @param {HTMLElement} selectedOptionElement - The HTMLElement that was clicked.
 */
function checkAnswer(userAnswer, selectedOptionElement) {
    if (!quizState.quizActive || optionsList.classList.contains('answered')) {
        return; // Prevent multiple answers per question or if quiz is not active
    }

    clearInterval(quizState.intervalId); // Stop timer temporarily
    optionsList.classList.add('answered'); // Disable further clicks on options
    nextQuestionBtn.disabled = false; // Enable next button

    const correctAnswer = quizData[quizState.currentQuestionIndex].answer;

    // Highlight correct answer
    Array.from(optionsList.children).forEach(optionEl => {
        if (optionEl.textContent === correctAnswer) {
            optionEl.classList.add('correct');
            optionEl.setAttribute('aria-checked', 'true');
        } else {
            optionEl.classList.add('incorrect-unselected'); // Style for unselected wrong answers
        }
        optionEl.removeAttribute('tabindex'); // Make all options unfocusable after answer
    });

    if (userAnswer === correctAnswer) {
        quizState.score++;
        feedbackArea.textContent = "Correct!";
        feedbackArea.classList.add('correct-feedback');
        selectedOptionElement.classList.add('correct'); // Highlight user's correct choice
        selectedOptionElement.setAttribute('aria-checked', 'true');
        quizState.answeredCorrectly = true;
    } else {
        feedbackArea.textContent = `Incorrect! The correct answer was "${correctAnswer}".`;
        feedbackArea.classList.add('incorrect-feedback');
        selectedOptionElement.classList.add('incorrect'); // Highlight user's incorrect choice
        selectedOptionElement.setAttribute('aria-checked', 'true');
        quizState.answeredCorrectly = false;
    }

    updateScoreDisplay();
    selectedOptionElement.focus(); // Keep focus on the selected answer for feedback
    nextQuestionBtn.focus(); // Suggest next action
}

/**
 * Advances to the next question or ends the quiz.
 */
function nextQuestion() {
    feedbackArea.textContent = ''; // Clear feedback
    feedbackArea.classList.remove('correct-feedback', 'incorrect-feedback'); // Clear feedback styling
    quizState.currentQuestionIndex++;
    quizState.timer = 60; // Reset timer for next question
    timeLeftSpan.style.color = ''; // Reset timer color
    if (quizState.currentQuestionIndex < quizData.length) {
        renderQuestion();
        quizState.intervalId = setInterval(updateTimer, 1000); // Restart timer
    } else {
        endQuiz();
    }
}

/**
 * Ends the quiz, displays results, and clears the timer.
 */
function endQuiz() {
    clearInterval(quizState.intervalId);
    quizState.quizActive = false;
    showSection(resultsSection);
    scoreValueSpan.textContent = quizState.score;
    totalQuestionsSpan.textContent = quizData.length;
    finalScoreDisplay.setAttribute('aria-label', `Your final score is ${quizState.score} out of ${quizData.length}.`);
    playAgainBtn.focus(); // Focus play again button for next action
}

/**
 * Displays the hint for the current question.
 */
function showHint() {
    if (quizState.hasHintBeenUsed) return; // Prevent multiple hint uses
    const currentQuizItem = quizData[quizState.currentQuestionIndex];
    hintText.textContent = `Hint: ${currentQuizItem.hint}`;
    hintText.style.display = 'block';
    hintText.setAttribute('aria-hidden', 'false');
    quizState.hasHintBeenUsed = true;
    hintBtn.disabled = true; // Disable hint button after use
    feedbackArea.textContent = 'Hint displayed!'; // Provide temporary feedback
    setTimeout(() => { feedbackArea.textContent = ''; }, 2000); // Clear feedback after 2 seconds
}

// --- Event Listeners ---

document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    startQuizBtn.addEventListener("click", startQuiz);
    nextQuestionBtn.addEventListener("click", nextQuestion);
    hintBtn.addEventListener("click", showHint);
    playAgainBtn.addEventListener("click", startQuiz);

    // Event delegation for options list
    optionsList.addEventListener("click", (event) => {
        const target = event.target.closest('li.option-item');
        if (target &&!optionsList.classList.contains('answered')) {
            checkAnswer(target.textContent, target);
        }
    });

    // Keyboard navigation for options
    optionsList.addEventListener('keydown', (event) => {
        if (optionsList.classList.contains('answered')) return; // Don't allow keypress after answered

        const activeElement = document.activeElement;
        const options = Array.from(optionsList.children);
        let currentIndex = options.indexOf(activeElement);

        if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
            event.preventDefault();
            currentIndex = (currentIndex + 1) % options.length;
            options[currentIndex].focus();
        } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
            event.preventDefault();
            currentIndex = (currentIndex - 1 + options.length) % options.length;
            options[currentIndex].focus();
        } else if (event.key === 'Enter' || event.key === ' ') {
            if (activeElement.classList.contains('option-item')) {
                event.preventDefault();
                checkAnswer(activeElement.textContent, activeElement);
            }
        }
    });

    // Placeholder for leaderboard functionality (to be implemented)
    viewLeaderboardBtn.addEventListener("click", () => {
        alert("Leaderboard functionality is coming soon!");
        // Here you would navigate to a leaderboard page or display a modal
    });

    // Initial display setup
    showSection(startSection);
});