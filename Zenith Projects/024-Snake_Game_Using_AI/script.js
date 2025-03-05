// Get the canvas element
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Set the canvas dimensions
canvas.width = 400;
canvas.height = 400;

// Define the snake and food objects
const snake = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    velocityX: 10,
    velocityY: 0,
    length: 1,
    tail: []
};

const food = {
    x: Math.floor(Math.random() * (canvas.width / 10)) * 10,
    y: Math.floor(Math.random() * (canvas.height / 10)) * 10
};

// Define the leaderboard array
const leaderboard = [];

// Define the multiplayer object
const multiplayer = {
    players: [],
    socket: null
};

// Define the AI model
const model = tf.sequential();
model.add(tf.layers.dense({units: 64, activation: 'relu', inputShape: [4]}));
model.add(tf.layers.dense({units: 64, activation: 'relu'}));
model.add(tf.layers.dense({units: 2, activation: 'softmax'}));
model.compile({optimizer: tf.optimizers.adam(), loss: 'meanSquaredError', metrics: ['accuracy']});

// Define the game loop
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    ctx.fillStyle = 'green';
    ctx.fillRect(snake.x, snake.y, 10, 10);
    snake.tail.forEach((tailSegment) => {
        ctx.fillRect(tailSegment.x, tailSegment.y, 10, 10);
    });

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);

    // Update the snake position
    snake.x += snake.velocityX;
    snake.y += snake.velocityY;

// Check for collisions with the wall or itself
if (snake.x < 0 || snake.x >= canvas.width || snake.y < 0 || snake.y >= canvas.height) {
    gameOver();
    return;
}
snake.tail.forEach((tailSegment) => {
    if (snake.x === tailSegment.x && snake.y === tailSegment.y) {
        gameOver();
        return;
    }
});

// Check if the snake has eaten the food
if (snake.x === food.x && snake.y === food.y) {
    snake.length++;
    food.x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    food.y = Math.floor(Math.random() * (canvas.height / 10)) * 10;
}

// Update the snake tail
snake.tail.push({x: snake.x, y: snake.y});
if (snake.tail.length > snake.length) {
    snake.tail.shift();
}

// Call the AI function to predict the next move
const prediction = predictNextMove(snake, food);
snake.velocityX = prediction.velocityX;
snake.velocityY = prediction.velocityY;

// Update the multiplayer mode
if (multiplayer.socket) {
    multiplayer.socket.emit('playerUpdate', {playerId: 'player1', x: snake.x, y: snake.y});
}

// Request the next frame
requestAnimationFrame(gameLoop);
}

// Define the predictNextMove function
function predictNextMove(snake, food) {
    // Create the input data
    const inputData = tf.tensor2d([[
        snake.x / canvas.width,
        snake.y / canvas.height,
        food.x / canvas.width,
        food.y / canvas.height
    ]]);

    // Make a prediction
    const prediction = model.predict(inputData);

    // Get the predicted velocity
    const velocity = prediction.dataSync();

    // Return the predicted velocity
    return {
        velocityX: velocity[0] * 10,
        velocityY: velocity[1] * 10
    };
}

// Define the gameOver function
function gameOver() {
    // Get the game over modal
    const gameOverModal = document.getElementById('game-over-modal');
    const finalScoreElement = document.getElementById('final-score');

    // Set the final score
    finalScoreElement.textContent = snake.length - 1;

    // Show the game over modal
    gameOverModal.style.display = 'block';

    // Add an event listener to the play again button
    document.getElementById('play-again-button').addEventListener('click', () => {
        // Reset the snake and food objects
        snake.x = canvas.width / 2;
        snake.y = canvas.height / 2;
        snake.velocityX = 10;
        snake.velocityY = 0;
        snake.length = 1;
        snake.tail = [];
        food.x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
        food.y = Math.floor(Math.random() * (canvas.height / 10)) * 10;

        // Hide the game over modal
        gameOverModal.style.display = 'none';

        // Start the game loop again
        gameLoop();
    });
}

// Define the updateLeaderboard function
function updateLeaderboard(score) {
    // Check if the score is already in the leaderboard
    const existingScoreIndex = leaderboard.findIndex((entry) => entry.score === score);
    if (existingScoreIndex !== -1) {
        // If the score is already in the leaderboard, update the name
        leaderboard[existingScoreIndex].name = prompt("Enter your name:");
    } else {
        // If the score is not in the leaderboard, add it
        leaderboard.push({name: prompt("Enter your name:"), score: score});
        // Sort the leaderboard by score in descending order
        leaderboard.sort((a, b) => b.score - a.score);
    }
    // Display the leaderboard
    displayLeaderboard();
}

// Define the displayLeaderboard function
function displayLeaderboard() {
    // Get the leaderboard element
    const leaderboardElement = document.getElementById("leaderboard");
    // Clear the leaderboard element
    leaderboardElement.innerHTML = "";
    // Loop through the leaderboard array and display each entry
    leaderboard.forEach((entry, index) => {
        const leaderboardEntryElement = document.createElement("div");
        leaderboardEntryElement.textContent = `${index + 1}. ${entry.name} - ${entry.score}`;
        leaderboardElement.appendChild(leaderboardEntryElement);
    });
}

// Initialize the multiplayer mode
function initMultiplayer() {
    // Create a socket connection
    multiplayer.socket = io.connect('http://localhost:3000');
    // Listen for incoming messages
    multiplayer.socket.on('message', (data) => {
        // Handle incoming messages
        handleIncomingMessage(data);
    });
}

// Handle incoming messages
function handleIncomingMessage(data) {
    // Check the type of message
    if (data.type === 'playerUpdate') {
        // Update the player's position
        updatePlayerPosition(data.playerId, data.x, data.y);
    } else if (data.type === 'newPlayer') {
        // Add a new player to the game
        addNewPlayer(data.playerId, data.x, data.y);
    }
}

// Update a player's position
function updatePlayerPosition(playerId, x, y) {
    // Find the player in the players array
    const playerIndex = multiplayer.players.findIndex((player) => player.id === playerId);
    if (playerIndex !== -1) {
        // Update the player's position
        multiplayer.players[playerIndex].x = x;
        multiplayer.players[playerIndex].y = y;
    }
}

// Add a new player to the game
function addNewPlayer(playerId, x, y) {
    // Create a new player object
    const newPlayer = {
        id: playerId,
        x: x,
        y: y
    };
    // Add the new player to the players array
    multiplayer.players.push(newPlayer);
}

// Initialize the game
function initGame() {
    // Initialize the multiplayer mode
    initMultiplayer();
    // Start the game loop
    gameLoop();
}

// Start the game
initGame();