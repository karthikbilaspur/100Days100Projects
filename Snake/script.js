// --- Constants ---
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;
const GRID_SIZE = 20; // Represents both snake segment and food size
const INITIAL_SNAKE_LENGTH = 3;
const GAME_SPEED_MULTIPLIER = 0.9; // Each level, speed reduces by this factor
const INITIAL_GAME_INTERVAL = 150; // Milliseconds per frame at level 1

const POWER_UP_DURATION_FRAMES = 100; // How many frames a power-up lasts
const POWER_UP_SPAWN_INTERVAL_MS = 15000; // How often power-ups can spawn
const OBSTACLE_SPAWN_INTERVAL_MS = 10000; // How often obstacles spawn
const MAX_OBSTACLES = 5; // Max number of obstacles on screen

// --- Game State Variables ---
let score = 0;
let highScore = localStorage.getItem('snakeHighScore')? parseInt(localStorage.getItem('snakeHighScore')) : 0;
let level = 1;
let snake = []; // Array of {x, y} objects
let food = {}; // {x, y}
let powerUp = null; // {x, y, type, timer}
let obstacles = []; // Array of {x, y, image}
let currentDirection = { x: 1, y: 0 }; // Initial direction (right)
let changingDirection = false; // Flag to prevent rapid direction changes
let gameIntervalId; // Stores the setInterval ID for the game loop
let gameRunning = false;
let gamePaused = false;
let gameOver = false;
let muted = false;
let powerUpTimer = 0; // Counts down frames for active power-up effects

// --- Game Asset Management ---
const images = {};
const sounds = {};
const assetsToLoad = {
    // Backgrounds - pre-load them but actual drawing handles dynamic loading
    // 'bg_sunrise': 'sunrise.jpg', // These would need to be loaded as Image objects
    // 'bg_sunset': 'sunset.jpg',
    // 'bg_jungle': 'jungle.jpg',
    // 'bg_desert': 'desert.jpg',
    // 'bg_city': 'city.jpg',
    // 'bg_weather': 'weather.jpg',
    // 'bg_day': 'day.jpg',
    // 'bg_night': 'night.jpg',
    'obstacle_spikes': 'spikes.png', // Example obstacle image
    // You would add food, power-up images here too, e.g.,
    'food_apple': 'apple.png',
    'powerup_speed': 'speed_boost.png',
    'powerup_shield': 'shield.png',
    'powerup_score': 'score_boost.png',
};

const backgroundImages = [
    'sunrise.jpg', // Level 1
    'sunset.jpg', // Level 2
    'jungle.jpg', // Level 3
    'desert.jpg', // Level 4
    'city.jpg', // Level 5
    'weather.jpg', // Level 6
    'day.jpg', // Level 7
    'night.jpg', // Level 8+
];

const powerUpTypes = {
    SPEED_BOOST: { score: 0, image: 'powerup_speed', effect: 'speed' },
    SHIELD: { score: 0, image: 'powerup_shield', effect: 'invincible' },
    SCORE_MULTIPLIER: { score: 10, image: 'powerup_score', effect: 'multiplier' }
};

const audioFiles = {
    'eat': 'eat.mp3',
    'food_spawn': 'food.mp3',
    'game_over': 'gameover.mp3',
    'game_start': 'gamestart.mp3',
    'level_up': 'levelup.mp3',
    'power_up_collect': 'powerup.mp3',
    'collision': 'collision.mp3',
    'background_music': 'bg_music.mp3' // Optional background music
};

let assetsLoaded = 0;
let totalAssets = Object.keys(assetsToLoad).length + Object.keys(audioFiles).length + backgroundImages.length;

// --- DOM Elements ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('highScore');
const levelDisplay = document.getElementById('level');
const gameOverlay = document.getElementById('gameOverlay');
const overlayTitle = document.getElementById('overlayTitle');
const overlayMessage = document.getElementById('overlayMessage');
const startGameBtn = document.getElementById('startGameBtn');
const pauseOverlay = document.getElementById('pauseOverlay');
const resumeGameBtn = document.getElementById('resumeGameBtn');
const muteBtn = document.getElementById('muteBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

// --- Asset Loading ---
function loadAssets() {
    // Load images
    for (const key in assetsToLoad) {
        const img = new Image();
        img.src = `assets/images/${assetsToLoad[key]}`;
        img.onload = () => {
            images[key] = img;
            assetLoaded();
        };
        img.onerror = () => {
            console.error(`Failed to load image: ${assetsToLoad[key]}`);
            assetLoaded(); // Still call to avoid blocking
        };
    }

    // Load background images
    backgroundImages.forEach((src, index) => {
        const img = new Image();
        img.src = `assets/images/${src}`;
        img.onload = () => {
            images[`bg_${index + 1}`] = img; // Store as bg_1, bg_2, etc.
            assetLoaded();
        };
        img.onerror = () => {
            console.error(`Failed to load background image: ${src}`);
            assetLoaded();
        };
    });

    // Load sounds
    for (const key in audioFiles) {
        const audio = new Audio(`assets/audio/${audioFiles[key]}`);
        audio.preload = 'auto';
        audio.oncanplaythrough = () => assetLoaded(); // Fired when entire media can be played
        audio.onerror = () => {
            console.error(`Failed to load audio: ${audioFiles[key]}`);
            assetLoaded(); // Still call to avoid blocking
        };
        sounds[key] = audio;
    }
}

function assetLoaded() {
    assetsLoaded++;
    if (assetsLoaded === totalAssets) {
        console.log('All assets loaded!');
        startGameBtn.disabled = false;
        overlayTitle.textContent = 'Retro Snake Classic';
        overlayMessage.textContent = 'Assets loaded. Press START to play!';
        // Set up background music loop if available
        if (sounds.background_music) {
            sounds.background_music.loop = true;
            sounds.background_music.volume = 0.3; // Default lower volume
            // Autoplay might be blocked by browsers, will play on first user interaction
        }
    }
}

function playSound(key) {
    if (!muted && sounds[key]) {
        // Create a new instance to allow multiple plays
        const sound = new Audio(sounds[key].src);
        sound.volume = sounds[key].volume || 1; // Use original volume or default
        sound.play().catch(e => console.warn("Audio playback prevented:", e));
    }
}

function updateMuteButton() {
    muteBtn.innerHTML = muted? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
    muteBtn.classList.toggle('active', muted);
    if (sounds.background_music) {
        sounds.background_music.muted = muted;
    }
}

// --- Game Logic Functions ---

function initGame() {
    clearInterval(gameIntervalId); // Clear any existing game loop
    score = 0;
    level = 1;
    snake = [];
    currentDirection = { x: 1, y: 0 }; // Start moving right
    changingDirection = false;
    gameOver = false;
    gameRunning = false;
    gamePaused = false;
    powerUp = null;
    powerUpTimer = 0;
    obstacles = [];

    // Initial snake body
    for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
        snake.push({
            x: CANVAS_WIDTH / 2 - i * GRID_SIZE,
            y: CANVAS_HEIGHT / 2
        });
    }

    updateScoreDisplay();
    highScoreDisplay.textContent = highScore;
    levelDisplay.textContent = level;

    placeFood();
    spawnObstaclesInterval = setInterval(spawnObstacle, OBSTACLE_SPAWN_INTERVAL_MS);
    spawnPowerUpInterval = setInterval(spawnPowerUp, POWER_UP_SPAWN_INTERVAL_MS);

    // Initial draw to show snake and food before game starts
    drawGame();
}

function startGame() {
    if (!gameRunning) {
        gameRunning = true;
        gameOverlay.classList.add('hidden');
        pauseOverlay.classList.add('hidden');
        // Resume background music
        if (sounds.background_music &&!sounds.background_music.muted) {
             sounds.background_music.play().catch(e => console.warn("Background music autoplay prevented:", e));
        }
        playSound('game_start');
        gameIntervalId = setInterval(gameLoop, INITIAL_GAME_INTERVAL);
        updatePauseButton(); // Ensure pause button shows pause icon
    }
}

function pauseGame() {
    if (gameRunning &&!gameOver) {
        gamePaused = true;
        gameRunning = false;
        clearInterval(gameIntervalId);
        pauseOverlay.classList.remove('hidden');
        if (sounds.background_music) sounds.background_music.pause();
        updatePauseButton(); // Ensure pause button shows play icon
    }
}

function resumeGame() {
    if (gamePaused &&!gameOver) {
        gamePaused = false;
        gameRunning = true;
        pauseOverlay.classList.add('hidden');
        if (sounds.background_music &&!sounds.background_music.muted) sounds.background_music.play();
        gameIntervalId = setInterval(gameLoop, getGameSpeed());
        updatePauseButton(); // Ensure pause button shows pause icon
    }
}

function endGame() {
    gameOver = true;
    gameRunning = false;
    clearInterval(gameIntervalId);
    clearInterval(spawnObstaclesInterval);
    clearInterval(spawnPowerUpInterval);
    playSound('game_over');
    if (sounds.background_music) sounds.background_music.pause();

    // Update high score
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
        highScoreDisplay.textContent = highScore;
    }

    overlayTitle.textContent = 'GAME OVER!';
    overlayMessage.innerHTML = `Your Score: ${score}<br>High Score: ${highScore}`;
    startGameBtn.textContent = 'PLAY AGAIN';
    gameOverlay.classList.remove('hidden');
}

function updateScoreDisplay() {
    scoreDisplay.textContent = score;
}

function getGameSpeed() {
    return INITIAL_GAME_INTERVAL * Math.pow(GAME_SPEED_MULTIPLIER, level - 1);
}

// Check if a given (x, y) coordinate is free (not occupied by snake, food, power-up, or obstacle)
function isPositionFree(x, y) {
    // Check snake body
    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === x && snake[i].y === y) return false;
    }
    // Check food
    if (food.x === x && food.y === y) return false;
    // Check power-up
    if (powerUp && powerUp.x === x && powerUp.y === y) return false;
    // Check obstacles
    for (let i = 0; i < obstacles.length; i++) {
        if (obstacles[i].x === x && obstacles[i].y === y) return false;
    }
    return true;
}

function getRandomGridPosition() {
    let x, y;
    do {
        x = Math.floor(Math.random() * (CANVAS_WIDTH / GRID_SIZE)) * GRID_SIZE;
        y = Math.floor(Math.random() * (CANVAS_HEIGHT / GRID_SIZE)) * GRID_SIZE;
    } while (!isPositionFree(x, y)); // Keep trying until a free spot is found
    return { x, y };
}

function placeFood() {
    food = getRandomGridPosition();
    playSound('food_spawn');
}

let spawnPowerUpInterval;
function spawnPowerUp() {
    if (!gameRunning || powerUp || obstacles.length >= MAX_OBSTACLES) return; // Don't spawn if one exists or too many obstacles

    const typeKeys = Object.keys(powerUpTypes);
    const randomTypeKey = typeKeys[Math.floor(Math.random() * typeKeys.length)];
    const type = powerUpTypes[randomTypeKey];

    powerUp = {
       ...getRandomGridPosition(),
        type: type.effect,
        image: images[type.image] || null,
        timer: POWER_UP_DURATION_FRAMES, // frames
        score: type.score
    };

    // Remove old power-up if it exists
    if (powerUpInterval) clearInterval(powerUpInterval);
    powerUpInterval = setTimeout(() => {
        if(powerUp) powerUp = null; // Clear power-up if not collected
    }, POWER_UP_SPAWN_INTERVAL_MS * 0.8); // Disappear before next possible spawn
}

let spawnObstaclesInterval;
function spawnObstacle() {
    if (!gameRunning || obstacles.length >= MAX_OBSTACLES) return;

    // Ensure obstacle spawns on a free spot
    const { x, y } = getRandomGridPosition();

    obstacles.push({
        x: x,
        y: y,
        image: images.obstacle_spikes // Assuming you have this image loaded
    });

    // Remove the oldest obstacle after a certain time/count
    if (obstacles.length > MAX_OBSTACLES) {
        obstacles.shift();
    }
}

function applyPowerUp(type) {
    playSound('power_up_collect');
    switch (type) {
        case 'speed':
            // Temporarily increase game speed, then revert
            clearInterval(gameIntervalId);
            gameIntervalId = setInterval(gameLoop, getGameSpeed() * 0.5); // Double speed
            powerUpTimer = POWER_UP_DURATION_FRAMES; // Set timer
            break;
        case 'invincible':
            // Temporarily ignore obstacle/wall collisions
            // Draw snake with a shield effect
            powerUpTimer = POWER_UP_DURATION_FRAMES;
            break;
        case 'multiplier':
            // Score multiplier for next few foods
            powerUpTimer = POWER_UP_DURATION_FRAMES;
            break;
    }
}

function checkPowerUpEffect() {
    if (powerUpTimer > 0) {
        powerUpTimer--;
        // Logic for power-up effects while active
        if (powerUpTimer === 0) {
            // Revert effects
            clearInterval(gameIntervalId);
            gameIntervalId = setInterval(gameLoop, getGameSpeed()); // Revert to normal speed
            // Clear any visual shield effects etc.
            console.log("Power-up effect ended.");
        }
    }
}

// --- Game Loop (Update and Draw) ---

function gameLoop() {
    if (gameOver || gamePaused) return;

    checkPowerUpEffect();
    changingDirection = false; // Allow direction change for next frame

    // Move snake
    const head = { x: snake[0].x + currentDirection.x * GRID_SIZE, y: snake[0].y + currentDirection.y * GRID_SIZE };

    // Check collisions
    if (checkCollision(head)) {
        playSound('collision');
        endGame();
        return;
    }

    snake.unshift(head); // Add new head

    // Check if food eaten
    const didEatFood = head.x === food.x && head.y === food.y;
    if (didEatFood) {
        score += 1;
        playSound('eat');
        if (powerUpTimer > 0 && powerUp && powerUp.type === 'multiplier') {
            score += powerUp.score; // Add bonus points from multiplier power-up
        }
        updateScoreDisplay();
        placeFood(); // Place new food
        if (score % LEVEL_UP_SCORE === 0) {
            levelUp();
        }
    } else {
        snake.pop(); // Remove tail if no food eaten (moves snake)
    }

    // Check if power-up collected
    if (powerUp && head.x === powerUp.x && head.y === powerUp.y) {
        applyPowerUp(powerUp.type);
        score += powerUp.score; // Add power-up score
        updateScoreDisplay();
        powerUp = null; // Power-up collected
    }

    drawGame();
}

function checkCollision(head) {
    // Wall collision
    const isInvincible = powerUpTimer > 0 && powerUp && powerUp.type === 'invincible';
    if (!isInvincible && (head.x < 0 || head.x >= CANVAS_WIDTH || head.y < 0 || head.y >= CANVAS_HEIGHT)) {
        return true;
    }
    // Self-collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    // Obstacle collision
    if (!isInvincible) {
        for (let i = 0; i < obstacles.length; i++) {
            if (head.x === obstacles[i].x && head.y === obstacles[i].y) {
                return true;
            }
        }
    }
    return false;
}

function levelUp() {
    level++;
    levelDisplay.textContent = level;
    playSound('level_up');
    clearInterval(gameIntervalId);
    gameIntervalId = setInterval(gameLoop, getGameSpeed());
    // Optionally add more obstacles or change game dynamics per level
}

function drawGame() {
    // Draw background based on level
    const bgImage = images[`bg_${Math.min(level, backgroundImages.length)}`]; // Cap at available backgrounds
    if (bgImage) {
        ctx.drawImage(bgImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    } else {
        ctx.fillStyle = 'black'; // Fallback
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    // Draw food
    if (images.food_apple) { // Assuming a default food image
        ctx.drawImage(images.food_apple, food.x, food.y, GRID_SIZE, GRID_SIZE);
    } else {
        ctx.fillStyle = 'red';
        ctx.fillRect(food.x, food.y, GRID_SIZE, GRID_SIZE);
    }

    // Draw snake
    const snakeColor = (powerUpTimer > 0 && powerUp && powerUp.type === 'invincible')? 'gold' : 'lime';
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0? 'darkgreen' : snakeColor; // Head is darker green
        ctx.strokeStyle = 'rgba(0,0,0,0.2)';
        ctx.fillRect(snake[i].x, snake[i].y, GRID_SIZE, GRID_SIZE);
        ctx.strokeRect(snake[i].x, snake[i].y, GRID_SIZE, GRID_SIZE);
    }

    // Draw power-up
    if (powerUp) {
        if (powerUp.image) {
            ctx.drawImage(powerUp.image, powerUp.x, powerUp.y, GRID_SIZE, GRID_SIZE);
        } else {
            ctx.fillStyle = 'blue'; // Fallback for power-up
            ctx.fillRect(powerUp.x, powerUp.y, GRID_SIZE, GRID_SIZE);
        }
        // Optionally draw a timer on the power-up
        if (powerUpTimer > 0) {
             ctx.fillStyle = 'white';
             ctx.font = '8px Arial';
             ctx.textAlign = 'center';
             ctx.textBaseline = 'middle';
             ctx.fillText(Math.ceil(powerUpTimer / 10), powerUp.x + GRID_SIZE / 2, powerUp.y + GRID_SIZE / 2);
        }
    }

    // Draw obstacles
    for (let i = 0; i < obstacles.length; i++) {
        if (obstacles[i].image) {
            ctx.drawImage(obstacles[i].image, obstacles[i].x, obstacles[i].y, GRID_SIZE, GRID_SIZE);
        } else {
            ctx.fillStyle = 'gray'; // Fallback for obstacles
            ctx.fillRect(obstacles[i].x, obstacles[i].y, GRID_SIZE, GRID_SIZE);
        }
    }
}

// --- Event Handlers ---

function changeDirection(event) {
    if (changingDirection ||!gameRunning) return; // Prevent multiple changes per frame
    changingDirection = true;

    const keyPressed = event.key;
    const goingUp = currentDirection.y === -1;
    const goingDown = currentDirection.y === 1;
    const goingLeft = currentDirection.x === -1;
    const goingRight = currentDirection.x === 1;

    if (keyPressed === 'ArrowLeft' &&!goingRight) {
        currentDirection = { x: -1, y: 0 };
    } else if (keyPressed === 'ArrowUp' &&!goingDown) {
        currentDirection = { x: 0, y: -1 };
    } else if (keyPressed === 'ArrowRight' &&!goingLeft) {
        currentDirection = { x: 1, y: 0 };
    } else if (keyPressed === 'ArrowDown' &&!goingUp) {
        currentDirection = { x: 0, y: 1 };
    } else if (keyPressed === 'p' || keyPressed === 'P') {
        if (gameRunning) {
            pauseGame();
        } else if (gamePaused) {
            resumeGame();
        }
    }
}

function updatePauseButton() {
    pauseBtn.innerHTML = gameRunning? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
}

// --- Event Listeners ---
document.addEventListener('keydown', changeDirection);
startGameBtn.addEventListener('click', startGame);
resumeGameBtn.addEventListener('click', resumeGame);
muteBtn.addEventListener('click', () => {
    muted =!muted;
    updateMuteButton();
});
pauseBtn.addEventListener('click', () => {
    if (gameRunning) {
        pauseGame();
    } else if (gamePaused) {
        resumeGame();
    }
});
resetBtn.addEventListener('click', () => {
    initGame();
    gameOverlay.classList.remove('hidden'); // Show overlay
    overlayTitle.textContent = 'Retro Snake Classic';
    overlayMessage.textContent = 'Press START to play!';
    startGameBtn.textContent = 'START GAME';
    // Ensure background music is paused
    if (sounds.background_music) sounds.background_music.pause();
    updatePauseButton();
});

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    highScoreDisplay.textContent = highScore;
    updateMuteButton(); // Set initial mute button state
    startGameBtn.disabled = true; // Disable until assets loaded
    overlayTitle.textContent = 'Loading Assets...';
    overlayMessage.textContent = 'Please wait.';
    loadAssets(); // Start loading assets
    initGame(); // Initialize game state
});