// ==========================================================
// 1. Constants and Game Data
// ==========================================================
const COMMANDS = [
    "touch your nose", "hop on one foot", "clap your hands",
    "pat your head", "spin around", "jump up and down",
    "say your name", "point to the sky", "cross your arms",
    "wiggle your fingers", "blink three times", "take a deep breath"
];

const DIFFICULTY_SETTINGS = {
    easy: {
        commandDisplayTime: 3000, // Time Simon Says command is shown
        actionTime: 5000, // Time to perform action and click "I did it!"
        minCommands: 1, // Commands per round
        maxCommands: 2,
        commandDelay: 1000 // Delay between commands within a round
    },
    medium: {
        commandDisplayTime: 2000,
        actionTime: 3000,
        minCommands: 2,
        maxCommands: 3,
        commandDelay: 800
    },
    hard: {
        commandDisplayTime: 1500,
        actionTime: 2000,
        minCommands: 3,
        maxCommands: 5,
        commandDelay: 600
    }
};

const GAME_STATES = {
    IDLE: 'idle',
    SIMON_SAYS: 'simonSays',
    AWAITING_ACTION: 'awaitingAction',
    GAME_OVER: 'gameOver'
};

// ==========================================================
// 2. DOM Elements
// ==========================================================
const startGameButton = document.getElementById('start-game');
const difficultySelect = document.getElementById('difficulty');
const roundInfoSpan = document.querySelector('#round-info span');
const scoreInfoSpan = document.querySelector('#score-info span');
const simonSaysDisplay = document.getElementById('simon-says-display');
const commandDisplay = document.getElementById('command-display');
const countdownTimerBar = document.getElementById('countdown-timer');
const gameFeedback = document.getElementById('game-feedback');
const gameControlsDiv = document.getElementById('game-controls'); // To dynamically add "I did it!" button

// ==========================================================
// 3. Game State Variables
// ==========================================================
let currentGameState = GAME_STATES.IDLE;
let currentRound = 0;
let score = 0;
let currentCommandsInRound = [];
let difficulty = 'medium'; // Default difficulty
let actionTimer = null; // Timer for player's action phase
let gameTimeout = null; // General game loop timeouts
let actionButton = null; // Reference to the dynamically created "I did it!" button

// ==========================================================
// 4. Utility Functions
// ==========================================================

/**
 * Returns a random command from the COMMANDS array.
 * @returns {string} A random command.
 */
function getRandomCommand() {
    return COMMANDS[Math.floor(Math.random() * COMMANDS.length)];
}

/**
 * Delays execution for a specified number of milliseconds.
 * @param {number} ms - The delay time in milliseconds.
 * @returns {Promise<void>} A Promise that resolves after the delay.
 */
function delay(ms) {
    return new Promise(resolve => gameTimeout = setTimeout(resolve, ms));
}

/**
 * Updates the game feedback display.
 * @param {string} message - The message to display.
 * @param {string} type - 'correct', 'wrong', or 'info' for styling.
 */
function showFeedback(message, type = 'info') {
    gameFeedback.textContent = message;
    gameFeedback.className = ''; // Clear previous classes
    gameFeedback.classList.add(`feedback-${type}`);
}

/**
 * Clears the feedback message after a short delay.
 */
function clearFeedback() {
    clearTimeout(gameTimeout);
    gameTimeout = setTimeout(() => {
        gameFeedback.textContent = '';
        gameFeedback.className = '';
    }, 1500);
}

/**
 * Disables/enables the start button and difficulty selector.
 * @param {boolean} isDisabled - True to disable, false to enable.
 */
function setControlsDisabled(isDisabled) {
    startGameButton.disabled = isDisabled;
    difficultySelect.disabled = isDisabled;
}

/**
 * Resets the countdown timer bar's width.
 */
function resetTimerBar() {
    countdownTimerBar.style.width = '100%';
    countdownTimerBar.style.transition = 'none'; // Remove transition for instant reset
    // Force reflow to apply 'none' before setting new transition
    void countdownTimerBar.offsetWidth;
}

/**
 * Starts the countdown timer animation.
 * @param {number} duration - The total duration of the countdown in milliseconds.
 */
function startTimerAnimation(duration) {
    countdownTimerBar.style.transition = `width ${duration / 1000}s linear`;
    countdownTimerBar.style.width = '0%';
}

/**
 * Creates and appends the "I did it!" button.
 */
function createActionButton() {
    actionButton = document.createElement('button');
    actionButton.id = 'action-button';
    actionButton.classList.add('btn', 'btn-success');
    actionButton.textContent = 'I did it!';
    actionButton.addEventListener('click', handleActionButtonClick);
    gameControlsDiv.appendChild(actionButton);
}

/**
 * Removes the "I did it!" button.
 */
function removeActionButton() {
    if (actionButton) {
        actionButton.removeEventListener('click', handleActionButtonClick);
        actionButton.remove();
        actionButton = null;
    }
}

// ==========================================================
// 5. Game Logic Functions
// ==========================================================

/**
 * Advances the game to the next round.
 */
async function nextRound() {
    currentRound++;
    roundInfoSpan.textContent = currentRound;
    scoreInfoSpan.textContent = score; // Update score display

    currentCommandsInRound = [];
    const settings = DIFFICULTY_SETTINGS[difficulty];
    const numCommands = Math.floor(Math.random() * (settings.maxCommands - settings.minCommands + 1)) + settings.minCommands;

    for (let i = 0; i < numCommands; i++) {
        currentCommandsInRound.push(getRandomCommand());
    }

    await displayCommandsToSimon();
}

/**
 * Displays the "Simon Says" commands one by one to the player.
 */
async function displayCommandsToSimon() {
    currentGameState = GAME_STATES.SIMON_SAYS;
    setControlsDisabled(true);
    simonSaysDisplay.textContent = "Simon says...";
    commandDisplay.textContent = "Pay attention!";
    removeActionButton(); // Ensure action button is not present

    resetTimerBar();
    await delay(1000); // Short pause before showing commands

    const settings = DIFFICULTY_SETTINGS[difficulty];

    for (const cmd of currentCommandsInRound) {
        simonSaysDisplay.textContent = "Simon says:";
        commandDisplay.textContent = cmd;
        startTimerAnimation(settings.commandDisplayTime);
        await delay(settings.commandDisplayTime + settings.commandDelay); // Display time + small delay between commands
        resetTimerBar();
        simonSaysDisplay.textContent = "";
        commandDisplay.textContent = "";
    }

    // After commands are displayed, wait a bit then prompt action
    simonSaysDisplay.textContent = "Your turn!";
    await delay(500);
    promptForAction();
}

/**
 * Prompts the player to perform the action and starts the action timer.
 */
function promptForAction() {
    currentGameState = GAME_STATES.AWAITING_ACTION;
    simonSaysDisplay.textContent = "Do the command!";
    commandDisplay.textContent = "Click 'I did it!' when done.";
    createActionButton(); // Add the action button
    actionButton.disabled = false;

    const settings = DIFFICULTY_SETTINGS[difficulty];
    resetTimerBar();
    startTimerAnimation(settings.actionTime);

    // Set a timer for the player to click the button
    actionTimer = setTimeout(() => {
        // If timer runs out, it's game over
        endGame(false, "Time's up!");
    }, settings.actionTime);
}

/**
 * Handles the player's click on the "I did it!" button.
 */
function handleActionButtonClick() {
    if (currentGameState === GAME_STATES.AWAITING_ACTION) {
        clearTimeout(actionTimer); // Stop the action timer
        removeActionButton();
        score++;
        showFeedback("Correct! You remembered!", 'correct');
        clearFeedback(); // Clear after feedback
        nextRound(); // Go to the next round
    }
}

/**
 * Ends the current game.
 * @param {boolean} win - True if the game ended successfully (not applicable here), false if lost.
 * @param {string} reason - The reason for the game ending.
 */
function endGame(win, reason = "Game Over!") {
    currentGameState = GAME_STATES.GAME_OVER;
    clearTimeout(actionTimer);
    clearTimeout(gameTimeout); // Clear any pending game loop timeouts
    setControlsDisabled(false);
    removeActionButton();

    simonSaysDisplay.textContent = "Game Over!";
    commandDisplay.textContent = `You scored ${score} rounds.`;
    showFeedback(reason, 'wrong');
    resetTimerBar(); // Reset timer visually
    startGameButton.textContent = "Start New Game"; // Reset button text
}

/**
 * Initializes a new game.
 */
async function initializeGame() {
    currentRound = 0;
    score = 0;
    currentCommandsInRound = [];
    currentGameState = GAME_STATES.IDLE; // Set to idle before starting
    difficulty = difficultySelect.value; // Get selected difficulty

    setControlsDisabled(true); // Disable controls while game setup
    startGameButton.textContent = "Starting..."; // Provide feedback
    showFeedback("Get ready!", 'info');
    clearFeedback();

    simonSaysDisplay.textContent = "";
    commandDisplay.textContent = "";

    await delay(500); // Short delay before starting
    nextRound();
}

// ==========================================================
// 6. Event Listeners
// ==========================================================
startGameButton.addEventListener('click', () => {
    if (currentGameState === GAME_STATES.GAME_OVER || currentGameState === GAME_STATES.IDLE) {
        initializeGame();
    }
});

difficultySelect.addEventListener('change', (event) => {
    // If a game is in progress, changing difficulty might not be desired
    // For simplicity, we just update the 'difficulty' variable
    difficulty = event.target.value;
    if (currentGameState === GAME_STATES.GAME_OVER || currentGameState === GAME_STATES.IDLE) {
        showFeedback(`Difficulty set to ${difficulty}!`, 'info');
        clearFeedback();
    }
});

// Initial display setup
document.addEventListener('DOMContentLoaded', () => {
    roundInfoSpan.textContent = currentRound;
    scoreInfoSpan.textContent = score;
    simonSaysDisplay.textContent = "Welcome!";
    commandDisplay.textContent = "Click 'Start New Game' to play.";
    showFeedback("Choose your difficulty!", 'info');
    clearFeedback(); // Clear it after a few seconds
    resetTimerBar(); // Ensure timer bar is reset on load
});