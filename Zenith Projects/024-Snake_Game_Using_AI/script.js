// Constants
const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;
const SNAKE_SIZE = 20;
const FOOD_SIZE = 20;

// Get the canvas element
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Set the canvas dimensions
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

// Define the snake and food objects
class Snake {
    constructor() {
        this.x = CANVAS_WIDTH / 2;
        this.y = CANVAS_HEIGHT / 2;
        this.velocityX = SNAKE_SIZE;
        this.velocityY = 0;
        this.length = 1;
        this.tail = new LinkedList();
    }
}

class Food {
    constructor() {
        this.x = Math.floor(Math.random() * (CANVAS_WIDTH / SNAKE_SIZE)) * SNAKE_SIZE;
        this.y = Math.floor(Math.random() * (CANVAS_HEIGHT / SNAKE_SIZE)) * SNAKE_SIZE;
    }
}

// Define the LinkedList class
class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    add(x, y) {
        const node = new Node(x, y);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
    }

    remove() {
        if (!this.head) return;
        const node = this.head;
        this.head = node.next;
        if (!this.head) this.tail = null;
        return node;
    }
}

class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.next = null;
    }
}

// Define the game variables
let snake = new Snake();
let food = new Food();
let score = 0;
let lives = 3;
let gameOver = false;
let levelEditor = false;

// Define the game loop
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Update the snake position
    snake.x += snake.velocityX;
    snake.y += snake.velocityY;

    // Check for collisions with the wall or itself
    if (snake.x < 0 || snake.x >= CANVAS_WIDTH || snake.y < 0 || snake.y >= CANVAS_HEIGHT) {
        lives--;
        if (lives === 0) {
            gameOver = true;
        } else {
            snake.x = CANVAS_WIDTH / 2;
            snake.y = CANVAS_HEIGHT / 2;
            snake.velocityX = SNAKE_SIZE;
            snake.velocityY = 0;
        }
    }

    // Check if the snake has eaten the food
    if (snake.x === food.x && snake.y === food.y) {
        score++;
        food.x = Math.floor(Math.random() * (CANVAS_WIDTH / SNAKE_SIZE)) * SNAKE_SIZE;
        food.y = Math.floor(Math.random() * (CANVAS_HEIGHT / SNAKE_SIZE)) * SNAKE_SIZE;
    }

    // Update the snake tail
    snake.tail.add(snake.x, snake.y);
    if (snake.tail.length > score + 1) {
        snake.tail.remove();
    }

    // Render the game
    renderGame();

    // Check for game over
    if (gameOver) {
        renderGameOverScreen();
    }

    // Request the next frame
    requestAnimationFrame(gameLoop);
}

// Define the renderGame function
function renderGame() {
    // Render the snake
    ctx.fillStyle = 'green';
    snake.tail.forEach((node) => {
        ctx.fillRect(node.x, node.y, SNAKE_SIZE, SNAKE_SIZE);
    });

    // Render the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, FOOD_SIZE, FOOD_SIZE);

    // Render the score
    ctx.font = '24px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`Score: ${score}`, 10, 10);

    // Render the lives
    ctx.font = '24px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.fillText(`Lives: ${lives}`, CANVAS_WIDTH - 10, 10);
}

// Define the renderGameOverScreen function
function renderGameOverScreen() {
    // Clear the canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Render the game over text
    ctx.font = '48px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Game Over!', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

    // Render the final score
    ctx.font = '24px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`Final Score: ${score}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 50);

    // Render the play again button
    ctx.font = '24px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Play Again', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 100);

    // Add event listener for play again button
    canvas.addEventListener('click', (event) => {
        if (event.clientX >= CANVAS_WIDTH / 2 - 100 && event.clientX <= CANVAS_WIDTH / 2 + 100 && event.clientY >= CANVAS_HEIGHT / 2 + 50 && event.clientY <= CANVAS_HEIGHT / 2 + 150) {
            // Reset the game
            snake = new Snake();
            food = new Food();
            score = 0;
            lives = 3;
            gameOver = false;
            gameLoop();
        }
    });
}

// Define the handleInput function
function handleInput(event) {
    // Handle keyboard input
    if (event.key === 'ArrowUp' && snake.velocityY !== SNAKE_SIZE) {
        snake.velocityX = 0;
        snake.velocityY = -SNAKE_SIZE;
    } else if (event.key === 'ArrowDown' && snake.velocityY !== -SNAKE_SIZE) {
        snake.velocityX = 0;
        snake.velocityY = SNAKE_SIZE;
    } else if (event.key === 'ArrowLeft' && snake.velocityX !== SNAKE_SIZE) {
        snake.velocityX = -SNAKE_SIZE;
        snake.velocityY = 0;
    } else if (event.key === 'ArrowRight' && snake.velocityX !== -SNAKE_SIZE) {
        snake.velocityX = SNAKE_SIZE;
        snake.velocityY = 0;
    }
}

// Add event listener for keyboard input
document.addEventListener('keydown', handleInput);

// Add screen reader support
const gameOverAnnouncement = document.getElementById('game-over-instructions');
gameOverAnnouncement.textContent = 'Game over! Press play again to restart.';

// Start the game loop
gameLoop();