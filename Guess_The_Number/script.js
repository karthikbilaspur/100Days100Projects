// Function to dynamically load a script (e.g., confetti)
function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    script.onerror = () => console.error(`Failed to load script: ${src}`);
    document.head.appendChild(script);
}

// Load confetti library
loadScript('https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js', () => {
    console.log('Confetti library loaded.');
});

// DOM Elements
const difficultySelect = document.getElementById('difficulty');
const startGameBtn = document.getElementById('startGameBtn');
const messageDisplay = document.getElementById('message');
const guessesLeftDisplay = document.getElementById('guessesLeft');
const guessInput = document.getElementById('guessInput');
const submitGuessBtn = document.getElementById('submitGuessBtn');
const resetGameBtn = document.getElementById('resetGameBtn');
const body = document.body;
const guessHistoryList = document.getElementById('guessHistoryList'); // New
const highScoresList = document.getElementById('highScoresList'); // New
const instructionsBtn = document.getElementById('instructionsBtn'); // New
const instructionsModal = document.getElementById('instructionsModal'); // New
const closeButton = instructionsModal.querySelector('.close-button'); // New

// Game State Variables
let secretNumber;
let guessesRemaining;
let minNumber;
let maxNumber;
let currentDifficulty;
let currentGuessesMade; // New: To track guesses for high score
let guessHistory = []; // New: To store guess history

// Difficulty Settings
const difficulties = {
    easy: { range: [1, 50], attempts: 10, name: "Easy" },
    medium: { range: [1, 100], attempts: 7, name: "Medium" },
    hard: { range: [1, 200], attempts: 5, name: "Hard" }
};

// --- Game Logic Functions ---

function initializeGame() {
    currentDifficulty = difficultySelect.value;
    const settings = difficulties[currentDifficulty];
    [minNumber, maxNumber] = settings.range;
    guessesRemaining = settings.attempts;
    currentGuessesMade = 0; // Reset guesses made
    guessHistory = []; // Clear history

    secretNumber = generateRandomNumber(minNumber, maxNumber);

    // Update UI for new game
    messageDisplay.textContent = `I've picked a number between ${minNumber} and ${maxNumber}.`;
    guessesLeftDisplay.textContent = `Guesses Left: ${guessesRemaining}`;
    guessInput.value = '';
    guessInput.min = minNumber;
    guessInput.max = maxNumber;

    // Enable/Disable controls
    guessInput.disabled = false;
    submitGuessBtn.disabled = false;
    resetGameBtn.disabled = true;
    startGameBtn.disabled = true;
    difficultySelect.disabled = true;

    clearBackgroundEffect();
    updateGuessHistoryDisplay(); // Clear history display
    console.log(`New game started. Secret number: ${secretNumber} (Difficulty: ${currentDifficulty})`); // For debugging
}

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkGuess() {
    const userGuess = parseInt(guessInput.value);

    // Basic input validation
    if (isNaN(userGuess) || userGuess < minNumber || userGuess > maxNumber) {
        messageDisplay.textContent = `Please enter a number between ${minNumber} and ${maxNumber}.`;
        return;
    }

    currentGuessesMade++; // Increment guesses made
    guessesRemaining--;
    guessesLeftDisplay.textContent = `Guesses Left: ${guessesRemaining}`;

    // Add guess to history
    guessHistory.push({ guess: userGuess, result: '' });

    if (userGuess === secretNumber) {
        guessHistory[guessHistory.length - 1].result = 'Correct!';
        messageDisplay.textContent = `🥳 Congratulations! You guessed the number ${secretNumber} in ${currentGuessesMade} guesses!`;
        endGame(true);
        triggerConfetti();
        saveHighScore(currentGuessesMade); // Save high score
    } else if (guessesRemaining === 0) {
        guessHistory[guessHistory.length - 1].result = 'Incorrect (Last Guess)';
        messageDisplay.textContent = `Game Over! The number was ${secretNumber}.`;
        endGame(false);
    } else {
        let hintMessage = userGuess < secretNumber? "Too low! Try a higher number." : "Too high! Try a lower number.";
        guessHistory[guessHistory.length - 1].result = userGuess < secretNumber? 'Low' : 'High';

        // Add hint if only 1 guess left
        if (guessesRemaining === 1) {
            const parityHint = (secretNumber % 2 === 0)? "It's an even number." : "It's an odd number.";
            hintMessage += ` Last chance! Here's a hint: ${parityHint}`;
        }

        messageDisplay.textContent = hintMessage;
        applyProximityEffect(userGuess);
    }

    updateGuessHistoryDisplay(); // Update history display
    guessInput.value = ''; // Clear input after guess
}

function applyProximityEffect(userGuess) {
    const difference = Math.abs(secretNumber - userGuess);
    const rangeSize = maxNumber - minNumber;
    const thresholdNear = rangeSize * 0.03; // 3% of range - very close
    const thresholdWarm = rangeSize * 0.10; // 10% of range - warm
    const thresholdCool = rangeSize * 0.25; // 25% of range - cool

    clearBackgroundEffect();

    if (difference <= thresholdNear) {
        body.classList.add('bg-near');
    } else if (difference <= thresholdWarm) {
        body.classList.add('bg-warm');
    } else if (difference <= thresholdCool) {
        body.classList.add('bg-cool');
    }
}

function clearBackgroundEffect() {
    body.classList.remove('bg-success', 'bg-fail', 'bg-near', 'bg-warm', 'bg-cool');
}

function endGame(isWin) {
    guessInput.disabled = true;
    submitGuessBtn.disabled = true;
    resetGameBtn.disabled = false;
    startGameBtn.disabled = false;
    difficultySelect.disabled = false;

    if (isWin) {
        body.classList.add('bg-success');
    } else {
        body.classList.add('bg-fail');
    }
}

function resetGame() {
    clearBackgroundEffect();
    messageDisplay.textContent = 'Select a difficulty and click "Start Game"!';
    guessesLeftDisplay.textContent = 'Guesses Left: --';
    guessInput.value = '';
    guessInput.disabled = true;
    submitGuessBtn.disabled = true;
    resetGameBtn.disabled = true;
    startGameBtn.disabled = false;
    difficultySelect.disabled = false;
    guessHistory = []; // Clear history
    currentGuessesMade = 0; // Reset
    updateGuessHistoryDisplay(); // Clear history display
}

function triggerConfetti() {
    if (window.confetti) {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}

// --- New Features: Guess History and High Scores ---

function updateGuessHistoryDisplay() {
    guessHistoryList.innerHTML = ''; // Clear previous entries
    guessHistory.forEach((item, index) => {
        const listItem = document.createElement('li');
        let statusClass = '';
        if (item.result === 'Correct!') statusClass = 'correct';
        else if (item.result === 'Low') statusClass = 'low';
        else if (item.result === 'High') statusClass = 'high';
        else if (item.result === 'Incorrect (Last Guess)') statusClass = 'incorrect-last';

        listItem.innerHTML = `
            <span>Guess ${index + 1}: <strong class="${statusClass}">${item.guess}</strong></span>
            <span>${item.result}</span>
        `;
        guessHistoryList.appendChild(listItem);
    });
    // Scroll to bottom to show latest guess
    guessHistoryList.scrollTop = guessHistoryList.scrollHeight;
}

function getHighScores() {
    const scores = JSON.parse(localStorage.getItem('guessTheNumberHighScores')) || {};
    return scores[currentDifficulty] || [];
}

function saveHighScore(score) {
    const highScores = JSON.parse(localStorage.getItem('guessTheNumberHighScores')) || {};
    let difficultyScores = highScores[currentDifficulty] || [];

    const playerName = prompt(`New High Score for ${difficulties[currentDifficulty].name} mode! Enter your name:`) || 'Player';

    difficultyScores.push({ name: playerName, score: score });
    difficultyScores.sort((a, b) => a.score - b.score); // Sort ascending (fewer guesses is better)
    difficultyScores = difficultyScores.slice(0, 5); // Keep top 5

    highScores[currentDifficulty] = difficultyScores;
    localStorage.setItem('guessTheNumberHighScores', JSON.stringify(highScores));
    displayHighScores(); // Re-display scores
}

function displayHighScores() {
    highScoresList.innerHTML = '';
    const scores = getHighScores();

    if (scores.length === 0) {
        const listItem = document.createElement('li');
        listItem.textContent = 'No high scores yet!';
        highScoresList.appendChild(listItem);
        return;
    }

    scores.forEach((scoreEntry, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${index + 1}. <span class="name">${scoreEntry.name}</span></span>
            <span class="score">${scoreEntry.score} guesses</span>
        `;
        highScoresList.appendChild(listItem);
    });
}

// --- New Feature: Instructions Modal ---
function openInstructionsModal() {
    instructionsModal.style.display = 'flex';
}

function closeInstructionsModal() {
    instructionsModal.style.display = 'none';
}

// --- Event Listeners ---

startGameBtn.addEventListener('click', initializeGame);
submitGuessBtn.addEventListener('click', checkGuess);
guessInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' &&!submitGuessBtn.disabled) {
        checkGuess();
    }
});
resetGameBtn.addEventListener('click', resetGame);

// Event listeners for the instructions modal
instructionsBtn.addEventListener('click', openInstructionsModal);
closeButton.addEventListener('click', closeInstructionsModal);
window.addEventListener('click', (event) => {
    if (event.target === instructionsModal) {
        closeInstructionsModal();
    }
});

// Initial state on page load
difficultySelect.addEventListener('change', displayHighScores); // Update high scores when difficulty changes
resetGame(); // Set initial disabled states and messages
displayHighScores(); // Display high scores on load