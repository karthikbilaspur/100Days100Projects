// Get the canvas element
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set the canvas dimensions
canvas.width = 400;
canvas.height = 400;

// Set the snake and food dimensions
const snakeSize = 20;
const foodSize = 20;

// Set the initial snake position and direction
let snakeX = canvas.width / 2;
let snakeY = canvas.height / 2;
let directionX = 1;
let directionY = 0;

// Set the initial food position
let foodX = Math.floor(Math.random() * (canvas.width / snakeSize)) * snakeSize;
let foodY = Math.floor(Math.random() * (canvas.height / snakeSize)) * snakeSize;

// Set the initial score
let score = 0;

// Set the snake body
let snakeBody = [];

// Set the level
let level = 1;

// Set the power-up
let powerUp = null;

// Set the obstacles
let obstacles = [];

// Load audio files
const eatSound = new Audio('eat.mp3');
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const gameStartSound = new Audio('gamestart.mp3');
const levelUpSound = new Audio('levelup.mp3');
const powerUpSound = new Audio('powerup.mp3');
const collisionSound = new Audio('collision.mp3');

// Load background images
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

// Set the current background
let currentBackground = backgrounds[0];

// Draw the background
function drawBackground() {
    ctx.drawImage(currentBackground.image, currentBackground.x, currentBackground.y, canvas.width, canvas.height);
}

// Draw the snake
function drawSnake() {
    ctx.fillStyle = 'green';
    for (let i = 0; i < snakeBody.length; i++) {
        ctx.fillRect(snakeBody[i].x, snakeBody[i].y, snakeSize, snakeSize);
    }
    ctx.fillRect(snakeX, snakeY, snakeSize, snakeSize);
}

// Draw the food
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(foodX, foodY, foodSize, foodSize);
}

// Draw the power-up
function drawPowerUp() {
    if (powerUp) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(powerUp.x, powerUp.y, foodSize, foodSize);
    }
}

// Draw the obstacles
function drawObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        ctx.drawImage(obstacles[i].image, obstacles[i].x, obstacles[i].y, snakeSize, snakeSize);
    }
}

// Update the game state
function update() {
    // Update the snake position
    snakeX += directionX * snakeSize;
    snakeY += directionY * snakeSize;

    // Check for collision with the wall
    if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height) {
        collisionSound.play();
        gameOverSound.play();
        alert('Game Over!');
        return;
    }

    // Check for collision with the food
    if (snakeX === foodX && snakeY === foodY) {
        score++;
        foodX = Math.floor(Math.random() * (canvas.width / snakeSize)) * snakeSize;
        foodY = Math.floor(Math.random() * (canvas.height / snakeSize)) * snakeSize;
        eatSound.play();

        // Level up
        if (score % 10 === 0) {
            level++;
            levelUpSound.play();
        }
    } else {
        // Remove the tail of the snake
        snakeBody.shift();
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
            alert('Game Over!');
            return;
        }
    }
}

// Draw the game
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawSnake();
    drawFood();
    drawPowerUp();
    drawObstacles();
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
            x: Math.floor(Math.random() * (canvas.width / snakeSize)) * snakeSize,
            y: Math.floor(Math.random() * (canvas.height / snakeSize)) * snakeSize,
        };
    }
}, 10000);

// Spawn obstacles
setInterval(() => {
    obstacles.push({
        image: 'spikes.png',
        x: Math.floor(Math.random() * (canvas.width / snakeSize)) * snakeSize,
        y: Math.floor(Math.random() * (canvas.height / snakeSize)) * snakeSize,
    });
}, 5000);

// Main game loop
setInterval(() => {
    update();
    draw();
}, 1000 / 15);