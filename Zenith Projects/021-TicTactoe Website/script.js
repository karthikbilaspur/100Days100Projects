// Game variables
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;
let gameMode = 'single-player';
let boardSize = 3;

// DOM elements
const gameBoardElement = document.querySelector('.game-board');
const cells = document.querySelectorAll('.cell');
const playerTurnElement = document.querySelector('#player-turn');
const gameResultElement = document.querySelector('#game-result');
const resetButton = document.querySelector('#reset-button');
const leaderboardList = document.querySelector('#leaderboard-list');
const settingsForm = document.querySelector('#settings-form');
const loginForm = document.querySelector('#login-form');
const registerForm = document.querySelector('#register-form');

// Event listeners
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        handleCellClick(index);
    });
});

resetButton.addEventListener('click', resetGame);

settingsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    saveSettings();
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    login();
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    register();
});

// Game functions
function handleCellClick(index) {
    if (gameOver) return;
    if (gameBoard[index] !== '') return;

    gameBoard[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    checkForWin();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerTurnElement.textContent = `Player ${currentPlayer}'s turn`;
}

function checkForWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        if (gameBoard[condition[0]] === gameBoard[condition[1]] &&
            gameBoard[condition[1]] === gameBoard[condition[2]] &&
            gameBoard[condition[0]] !== '') {
            gameOver = true;
            gameResultElement.textContent = `Player ${gameBoard[condition[0]]} wins!`;
            return;
        }
    }

    if (!gameBoard.includes('')) {
        gameOver = true;
        gameResultElement.textContent = 'It\'s a draw!';
    }
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;

    cells.forEach((cell) => {
        cell.textContent = '';
    });

    playerTurnElement.textContent = `Player ${currentPlayer}'s turn`;
    gameResultElement.textContent = '';
}

// Leaderboard functions
function updateLeaderboard() {
    // TO DO: implement leaderboard update logic
    const leaderboard = [
        { name: 'Player 1', wins: 10 },
        { name: 'Player 2', wins: 5 },
        { name: 'Player 3', wins: 3 }
    ];

    leaderboardList.innerHTML = '';

    leaderboard.forEach((player) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${player.name} - ${player.wins} wins`;
        leaderboardList.appendChild(listItem);
    });
}

// Settings functions
function saveSettings() {
    gameMode = settingsForm.gameMode.value;
    boardSize = parseInt(settingsForm.boardSize.value);

    // TO DO: implement settings save logic
    console.log(`Game mode: ${gameMode}, Board size: ${boardSize}`);
}

// Login functions
function login() {
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    // TO DO: implement login logic
    console.log(`Username: ${username}, Password: ${password}`);
}

// Register functions
function register() {
    const username = registerForm.username.value;
    const password = registerForm.password.value;
    const confirmPassword = registerForm.confirmPassword.value;

    // TO DO: implement register logic
    console.log(`Username: ${username}, Password: ${password}, Confirm Password: ${confirmPassword}`);
}

// Initialize game
updateLeaderboard();