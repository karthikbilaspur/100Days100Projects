// Constants
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;
const SNAKE_SIZE = 20;
const FOOD_SIZE = 20;
const LEVEL_UP_SCORE = 10;

// Game variables
let score = 0;
let level = 1;
let snakeX = CANVAS_WIDTH / 2;
let snakeY = CANVAS_HEIGHT / 2;
let directionX = 1;
let directionY = 0;
let snakeBody = [];
let foodX;
let foodY;
let powerUp;
let obstacles = [];
let gameOver = false;

// Audio files
const eatSound = new Audio('eat.mp3');
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const gameStartSound = new Audio('gamestart.mp3');
const levelUpSound = new Audio('levelup.mp3');
const powerUpSound = new Audio('powerup.mp3');
const collisionSound = new Audio('collision.mp3');

// Background images
const backgrounds = [
    { image: 'sunrise.jpg', x: 0, y: 0 },
    { image: 'sunset.jpg', x: 0, y: 0 },
    { image: 'jungle.jpg', x: 0, y: 0 },
    { image: 'desert.jpg', x: 0, y: 0 },
    { image: 'city.jpg', x: 0, y: 0 },
    { image: 'weather.jpg', x: 0, y: 0 },
    { image: 'day.jpg', x: 0, y: 0 },
    { image: 'night.jpg', x: 0, y: 0 },
];

// Get the canvas element
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set the canvas dimensions
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

// Initialize the game
function initGame() {
    // Set the initial snake position and direction
    snakeX = CANVAS_WIDTH / 2;
    snakeY = CANVAS_HEIGHT / 2;
    directionX = 1;
    directionY = 0;

    // Set the initial food position
    foodX = Math.floor(Math.random() * (CANVAS_WIDTH / SNAKE_SIZE)) * SNAKE_SIZE;
    foodY = Math.floor(Math.random() * (CANVAS_HEIGHT / SNAKE_SIZE)) * SNAKE_SIZE;

    // Reset the score and level
    score = 0;
    level = 1;

    // Reset the snake body and obstacles
    snakeBody = [];
    obstacles = [];

    // Start the game loop
    gameLoop();
}

// Game loop
function gameLoop() {
    // Update the game state
    update();

    // Draw the game
    draw();

    // Check for game over
    if (gameOver) {
        // Display game over message
        ctx.font = '24px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Game Over!', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

        // Reset the game
        initGame();
    } else {
        // Request the next frame
        requestAnimationFrame(gameLoop);
    }
}

// Update the game state
function update() {
    // Update the snake position
    snakeX += directionX * SNAKE_SIZE;
    snakeY += directionY * SNAKE_SIZE;

    // Check for collision with the wall
    if (snakeX < 0 || snakeX >= CANVAS_WIDTH || snakeY < 0 || snakeY >= CANVAS_HEIGHT) {
        collisionSound.play();
        gameOverSound.play();
        gameOver = true;
        return;
    }

    // Check for collision with the food
    if (snakeX === foodX && snakeY === foodY) {
        score++;
        foodX = Math.floor(Math.random() * (CANVAS_WIDTH / SNAKE_SIZE)) * SNAKE_SIZE;
        foodY = Math.floor(Math.random() * (CANVAS_HEIGHT / SNAKE_SIZE)) * SNAKE_SIZE;
        eatSound.play();
    }

    // Level up
if (score % LEVEL_UP_SCORE === 0) {
    level++;
    levelUpSound.play();
}

// Add the new head of the snake
snakeBody.push({ x: snakeX, y: snakeY });

// Check for collision with the power-up
if (powerUp && snakeX === powerUp.x && snakeY === powerUp.y) {
    score += 5;
    powerUp = null;
    powerUpSound.play();
}

// Check for collision with obstacles
for (let i = 0; i < obstacles.length; i++) {
    if (snakeX === obstacles[i].x && snakeY === obstacles[i].y) {
        collisionSound.play();
        gameOverSound.play();
        gameOver = true;
        return;
    }
}
}

// Draw the game
function draw() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw the background
    ctx.drawImage(backgrounds[level - 1].image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw the snake
    ctx.fillStyle = 'green';
    for (let i = 0; i < snakeBody.length; i++) {
        ctx.fillRect(snakeBody[i].x, snakeBody[i].y, SNAKE_SIZE, SNAKE_SIZE);
    }
    ctx.fillRect(snakeX, snakeY, SNAKE_SIZE, SNAKE_SIZE);

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(foodX, foodY, FOOD_SIZE, FOOD_SIZE);

    // Draw the power-up
    if (powerUp) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(powerUp.x, powerUp.y, FOOD_SIZE, FOOD_SIZE);
    }

    // Draw the obstacles
    for (let i = 0; i < obstacles.length; i++) {
        ctx.drawImage(obstacles[i].image, obstacles[i].x, obstacles[i].y, SNAKE_SIZE, SNAKE_SIZE);
    }

    // Draw the score and level
    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`Score: ${score}`, 10, 10);
    ctx.fillText(`Level: ${level}`, 10, 40);
}

// Handle keyboard input
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (directionY !== 1) {
                directionX = 0;
                directionY = -1;
            }
            break;
        case 'ArrowDown':
            if (directionY !== -1) {
                directionX = 0;
                directionY = 1;
            }
            break;
        case 'ArrowLeft':
            if (directionX !== 1) {
                directionX = -1;
                directionY = 0;
            }
            break;
        case 'ArrowRight':
            if (directionX !== -1) {
                directionX = 1;
                directionY = 0;
            }
            break;
    }
});

// Spawn power-up
setInterval(() => {
    if (!powerUp) {
        powerUp = {
            x: Math.floor(Math.random() * (CANVAS_WIDTH / SNAKE_SIZE)) * SNAKE_SIZE,
            y: Math.floor(Math.random() * (CANVAS_HEIGHT / SNAKE_SIZE)) * SNAKE_SIZE,
        };
    }
}, 10000);

// Spawn obstacles
setInterval(() => {
    obstacles.push({
        image: 'spikes.png',
        x: Math.floor(Math.random() * (CANVAS_WIDTH / SNAKE_SIZE)) * SNAKE_SIZE,
        y: Math.floor(Math.random() * (CANVAS_HEIGHT / SNAKE_SIZE)) * SNAKE_SIZE,
    });
}, 5000);

// Initialize the game
initGame();
