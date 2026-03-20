const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

// Game Configuration
const GAME_DURATIONS = {
    easy: 45, // seconds
    normal: 30,
    hard: 20
};
const INITIAL_LIVES = 3;
const INSECT_SPAWN_INTERVALS = {
    easy: 1200, // ms
    normal: 900,
    hard: 600
};

// DOM Elements
const screens = document.querySelectorAll('.screen');
const difficultyBtns = document.querySelectorAll('.difficulty-btn');
const choose_insect_btns = document.querySelectorAll('.choose-insect-btn');
const start_btn = document.getElementById('start-btn');
const game_container = document.getElementById('game-container');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('high-score');
const livesCountEl = document.getElementById('lives-count');
const message = document.getElementById('message');
const catchSound = document.querySelector('audio[src="catch-sound.mp3"]');
const gameOverSound = document.querySelector('audio[src="game-over-sound.mp3"]');
const backgroundMusic = document.querySelector('audio[src="background-music.mp3"]');
const gameOverScreen = document.getElementById('game-over-screen');
const finalScoreEl = document.getElementById('final-score');
const gameOverHighScoreEl = document.getElementById('game-over-high-score');
const playAgainBtn = document.getElementById('play-again-btn');
const backToMenuBtn = document.getElementById('back-to-menu-btn');

// Game State Variables
let seconds = 0;
let score = 0;
let lives = INITIAL_LIVES;
let highScore = localStorage.getItem('highScore') || 0;
let selected_insect = {};
let gameInterval = null;
let insectSpawnInterval = null;
let gameDuration = GAME_DURATIONS.normal; // Default difficulty
let currentDifficulty = 'normal';

// --- Event Listeners ---

// Initial High Score Display
highScoreEl.innerHTML = `High Score: ${highScore}`;

// Start Button (initially hidden, shown after difficulty selection)
start_btn.style.display = 'none'; // Hide initially

// Difficulty Selection
difficultyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all difficulty buttons
        difficultyBtns.forEach(dBtn => dBtn.classList.remove('active'));
        // Add active class to the clicked button
        btn.classList.add('active');

        currentDifficulty = btn.dataset.difficulty;
        gameDuration = GAME_DURATIONS[currentDifficulty];
        start_btn.style.display = 'block'; // Show start button once difficulty is chosen
        console.log(`Difficulty set to: ${currentDifficulty}, Game Duration: ${gameDuration}s`);
    });
});

// "Play Game" button on the first screen
start_btn.addEventListener('click', () => {
    if (currentDifficulty) { // Only proceed if difficulty is selected
        screens[0].classList.add('up'); // Move to insect selection screen
        backgroundMusic.play(); // Start background music
    } else {
        alert('Please choose a difficulty level first!');
    }
});

// Choose Insect Buttons
choose_insect_btns.forEach((btn) => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img');
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt');
        selected_insect = { src, alt };
        screens[1].classList.add('up'); // Move to game screen
        initializeGame();
        startGame();
    });
});

// Play Again Button
playAgainBtn.addEventListener('click', () => {
    resetGame();
    screens[3].classList.remove('up'); // Hide game over screen
    screens[0].classList.add('up'); // Go to insect selection directly (screens[0] is start, screens[1] is insect select)
    initializeGame();
    startGame();
});

// Back to Main Menu Button
backToMenuBtn.addEventListener('click', () => {
    resetGame();
    screens[3].classList.remove('up'); // Hide game over screen
    screens[0].classList.remove('up'); // Go back to start screen
    screens[1].classList.remove('up'); // Ensure insect selection screen is down
    start_btn.style.display = 'none'; // Hide start button again
    difficultyBtns.forEach(dBtn => dBtn.classList.remove('active')); // Clear active difficulty
    currentDifficulty = null; // Reset difficulty
});

// --- Game Functions ---

function initializeGame() {
    seconds = 0;
    score = 0;
    lives = INITIAL_LIVES;
    timeEl.innerHTML = `Time: 00:00`;
    scoreEl.innerHTML = `Score: 0`;
    livesCountEl.innerHTML = lives;
    highScoreEl.innerHTML = `High Score: ${localStorage.getItem('highScore') || 0}`; // Update high score display
    game_container.innerHTML = ''; // Clear any existing insects
    game_container.appendChild(document.querySelector('.game-info')); // Re-add game info HUD
    game_container.appendChild(message); // Re-add message element
    message.classList.remove('visible'); // Hide game over message if it was visible
}

function startGame() {
    gameInterval = setInterval(increaseTime, 1000); // Update time every second
    insectSpawnInterval = setInterval(createInsect, INSECT_SPAWN_INTERVALS[currentDifficulty]); // Spawn insects
    console.log(`Game started with difficulty: ${currentDifficulty}`);
}

function increaseTime() {
    seconds++;
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;
    timeEl.innerHTML = `Time: ${String(minutes).padStart(2, '0')}:${String(secondsRemaining).padStart(2, '0')}`;
    if (seconds >= gameDuration) {
        gameOver();
    }
}

function createInsect() {
    const insect = document.createElement('div');
    insect.classList.add('insect');
    const { x, y } = getRandomLocation();
    insect.style.top = `${y}px`;
    insect.style.left = `${x}px`;
    insect.innerHTML = `<img src="${selected_insect.src}" alt="${selected_insect.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`;
    
    // Add event listener for catching
    insect.addEventListener('click', catchInsect);
    
    // Add event listener for missing (if insect leaves screen without being caught)
    insect.dataset.isCaught = 'false'; // Custom data attribute to track if caught
    insect.addEventListener('animationend', () => {
        if (insect.dataset.isCaught === 'false') {
            loseLife();
        }
        insect.remove(); // Remove insect after it animates off or is caught
    });
    
    game_container.appendChild(insect);
}

function getRandomLocation() {
    // Ensure insects appear fully within the game container
    const buffer = 150; // Keep insects away from edges
    const x = Math.random() * (SCREEN_WIDTH - buffer * 2) + buffer;
    const y = Math.random() * (SCREEN_HEIGHT - buffer * 2) + buffer;
    return { x, y };
}

function catchInsect() {
    increaseScore();
    this.dataset.isCaught = 'true'; // Mark as caught
    this.classList.add('caught'); // Trigger catch animation
    catchSound.currentTime = 0; // Allow sound to play again immediately
    catchSound.play();
    // No explicit remove here, animationend listener handles it
}

function increaseScore() {
    score++;
    scoreEl.innerHTML = `Score: ${score}`;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        highScoreEl.innerHTML = `High Score: ${highScore}`;
    }
}

function loseLife() {
    lives--;
    livesCountEl.innerHTML = lives;
    if (lives <= 0) {
        gameOver();
    }
}

function gameOver() {
    clearInterval(gameInterval);
    clearInterval(insectSpawnInterval);
    gameOverSound.currentTime = 0; // Allow sound to play again immediately
    gameOverSound.play();
    backgroundMusic.pause(); // Stop background music
    backgroundMusic.currentTime = 0;

    // Display game over screen
    finalScoreEl.innerHTML = score;
    gameOverHighScoreEl.innerHTML = highScore; // Ensure latest high score is shown
    screens[3].classList.add('up'); // Show game over screen

    // Clear any remaining insects
    document.querySelectorAll('.insect').forEach(insect => insect.remove());
}

function resetGame() {
    clearInterval(gameInterval);
    clearInterval(insectSpawnInterval);
    seconds = 0;
    score = 0;
    lives = INITIAL_LIVES;
    selected_insect = {};
    game_container.innerHTML = ''; // Clear game area
    message.classList.remove('visible');
    timeEl.innerHTML = `Time: 00:00`;
    scoreEl.innerHTML = `Score: 0`;
    livesCountEl.innerHTML = INITIAL_LIVES; // Reset lives display
    highScoreEl.innerHTML = `High Score: ${localStorage.getItem('highScore') || 0}`; // Update high score
}

// Event listener for missed insects (if an insect is not caught and moves off-screen)
game_container.addEventListener('click', (e) => {
    if (!e.target.closest('.insect') && seconds > 0 && lives > 0) {
        // If click is not on an insect and game is active
        loseLife();
    }
});