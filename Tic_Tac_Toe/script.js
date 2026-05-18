import Phaser from 'phaser';

// --- PHASER GAME LOGIC (Previously game.js) ---

// Function to generate Phaser game configuration dynamically
function getPhaserGameConfig(gameSettings) {
    return {
        type: Phaser.AUTO, // Use AUTO for WebGL if available, otherwise Canvas
        parent: 'phaser-game-container', // ID of the div to put the game in
        width: 600, // Will be adjusted by board size, this is a starting point
        height: 600, // Will be adjusted
        backgroundColor: '#34495e',
        scene: [new TicTacToeScene(gameSettings)]
    };
}

class TicTacToeScene extends Phaser.Scene {
    constructor(gameSettings) {
        super('TicTacToeScene');
        this.player1Name = gameSettings.player1Name;
        this.player2Name = gameSettings.player2Name;
        this.boardSize = gameSettings.boardSize;
        this.winSteps = gameSettings.winSteps;
        this.gameMode = gameSettings.gameMode;
        this.updateUI = gameSettings.updateUI; // Callback to update external UI
        this.showModal = gameSettings.showModal; // Callback to show external modal

        this.cellWidth = 0; // Calculated in create
        this.cellHeight = 0; // Calculated in create
        this.offsetX = 0; // Calculated in create to center board
        this.offsetY = 0; // Calculated in create to center board

        this.board = []; // 2D array representing the game board
        this.currentPlayer = 'X';
        this.gameActive = false;
        this.playerXScore = 0;
        this.playerOScore = 0;
        this.movesMade = 0;

        // Visual elements
        this.gridGraphics = null;
        this.cellGraphics = []; // Stores the 'X' or 'O' text objects
    }

    preload() {
        // No assets to preload for this simple game
    }

    create() {
        // Dynamic game size based on boardSize, maintaining aspect ratio
        const minDimension = Math.min(this.sys.game.config.width, this.sys.game.config.height);
        this.cellWidth = minDimension / (this.boardSize + 1); // Add some padding
        this.cellHeight = this.cellWidth; // Square cells

        // Adjust game width/height to fit board exactly if needed
        this.sys.game.resize(this.cellWidth * this.boardSize + this.cellWidth, this.cellHeight * this.boardSize + this.cellHeight);

        // Center the board within the canvas
        this.offsetX = (this.sys.game.config.width - (this.cellWidth * this.boardSize)) / 2;
        this.offsetY = (this.sys.game.config.height - (this.cellHeight * this.boardSize)) / 2;

        this.gridGraphics = this.add.graphics({ lineStyle: { width: 4, color: 0xffffff } });
        this.createBoardVisuals();
        this.resetGame(true); // Initial game setup, reset scores
    }

    createBoardVisuals() {
        if (this.gridGraphics) {
            this.gridGraphics.clear();
        }

        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardSize; j++) {
                const x = this.offsetX + j * this.cellWidth;
                const y = this.offsetY + i * this.cellHeight;

                // Create interactive zone for each cell
                const cellZone = this.add.zone(x + this.cellWidth / 2, y + this.cellHeight / 2, this.cellWidth, this.cellHeight)
                  .setRectangleDropZone(this.cellWidth, this.cellHeight)
                  .setInteractive();
                cellZone.setData({ row: i, col: j });
                cellZone.on('pointerdown', () => this.handleCellClick(i, j));

                // Store graphics object for later clearing if needed (for X/O text)
                this.cellGraphics.push(cellZone);
            }
        }

        // Draw grid lines
        for (let i = 0; i <= this.boardSize; i++) {
            // Horizontal lines
            this.gridGraphics.strokeLineShape(new Phaser.Geom.Line(this.offsetX, this.offsetY + i * this.cellHeight, this.offsetX + this.boardSize * this.cellWidth, this.offsetY + i * this.cellHeight));
            // Vertical lines
            this.gridGraphics.strokeLineShape(new Phaser.Geom.Line(this.offsetX + i * this.cellWidth, this.offsetY, this.offsetX + i * this.cellWidth, this.offsetY + this.boardSize * this.cellHeight));
        }
    }

    resetGame(resetScores = false) {
        this.board = Array(this.boardSize).fill(null).map(() => Array(this.boardSize).fill(''));
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.movesMade = 0;

        // Clear all existing X/O graphics
        this.children.each((child) => {
            if (child.isGameObject && child.type === 'Text') {
                child.destroy();
            }
        });

        if (resetScores) {
            this.playerXScore = 0;
            this.playerOScore = 0;
        }

        this.updateUI({
            playerXScore: this.playerXScore,
            playerOScore: this.playerOScore,
            turn: this.currentPlayer === 'X'? this.player1Name : (this.gameMode === 'pva'? 'AI' : this.player2Name),
            status: 'Game started!'
        });

        // If AI is Player O and it's their turn first (or X has made a move in a specific AI strategy), trigger AI move
        if (this.gameMode === 'pva' && this.currentPlayer === 'O') { // Assuming AI is always 'O'
            this.time.delayedCall(500, this.handleAIMove, [], this);
        }
    }

    handleCellClick(row, col) {
        if (!this.gameActive || this.board[row][col]!== '') {
            return;
        }

        // If in PvA mode and it's AI's turn, prevent player click
        if (this.gameMode === 'pva' && this.currentPlayer === 'O') {
            return;
        }

        this.makeMove(row, col);
    }

    makeMove(row, col) {
        if (!this.gameActive || this.board[row][col]!== '') {
            return;
        }

        this.board[row][col] = this.currentPlayer;
        this.movesMade++;
        this.drawMarker(row, col, this.currentPlayer);

        if (this.checkWin(row, col)) {
            this.gameActive = false;
            let winnerName = this.currentPlayer === 'X'? this.player1Name : (this.gameMode === 'pva'? 'AI' : this.player2Name);
            this.updateUI({ status: `${winnerName} wins!` });
            if (this.currentPlayer === 'X') {
                this.playerXScore++;
            } else {
                this.playerOScore++;
            }
            this.updateUI({ playerXScore: this.playerXScore, playerOScore: this.playerOScore });
            this.showModal(`${winnerName} wins!`);
        } else if (this.movesMade === this.boardSize * this.boardSize) {
            this.gameActive = false;
            this.updateUI({ status: 'It\'s a draw!' });
            this.showModal('It\'s a draw!');
        } else {
            this.switchPlayer();
            if (this.gameMode === 'pva' && this.currentPlayer === 'O') {
                this.time.delayedCall(700, this.handleAIMove, [], this); // AI makes a move after a short delay
            }
        }
    }

    drawMarker(row, col, player) {
        const x = this.offsetX + col * this.cellWidth + this.cellWidth / 2;
        const y = this.offsetY + row * this.cellHeight + this.cellHeight / 2;

        this.add.text(x, y, player, {
            fontSize: this.cellWidth * 0.7, // Scale font with cell size
            color: player === 'X'? '#f56565' : '#63b3ed', // Use red for X, blue for O
            fontFamily: 'Press Start 2P' // Use our new pixel font for markers!
        }).setOrigin(0.5);
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X'? 'O' : 'X';
        this.updateUI({
            turn: this.currentPlayer === 'X'? this.player1Name : (this.gameMode === 'pva'? 'AI' : this.player2Name),
            status: ''
        });
    }

    checkWin(lastRow, lastCol) {
        const player = this.board[lastRow][lastCol];
        const directions = [
            [0, 1], // Horizontal
            [1, 0], // Vertical
            [1, 1], // Diagonal (top-left to bottom-right)
            [1, -1] // Diagonal (top-right to bottom-left)
        ];

        for (const [dr, dc] of directions) {
            let count = 1;

            // Check in positive direction
            for (let i = 1; i < this.winSteps; i++) {
                const r = lastRow + i * dr;
                const c = lastCol + i * dc;
                if (r >= 0 && r < this.boardSize && c >= 0 && c < this.boardSize && this.board[r][c] === player) {
                    count++;
                } else {
                    break;
                }
            }

            // Check in negative direction (for lines passing through the last move)
            for (let i = 1; i < this.winSteps; i++) {
                const r = lastRow - i * dr;
                const c = lastCol - i * dc;
                if (r >= 0 && r < this.boardSize && c >= 0 && c < this.boardSize && this.board[r][c] === player) {
                    count++;
                } else {
                    break;
                }
            }

            if (count >= this.winSteps) {
                return true;
            }
        }
        return false;
    }

    // --- AI Logic (Minimax for optimal play) ---
    handleAIMove() {
        if (!this.gameActive || this.currentPlayer!== 'O' || this.gameMode!== 'pva') {
            return;
        }

        const bestMove = this.getBestAIMove();
        if (bestMove) {
            this.makeMove(bestMove.row, bestMove.col);
        }
    }

    getBestAIMove() {
        let bestScore = -Infinity;
        let move = null;

        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardSize; j++) {
                if (this.board[i][j] === '') {
                    this.board[i][j] = 'O'; // Try AI's move
                    let score = this.minimax(0, false);
                    this.board[i][j] = ''; // Undo the move

                    if (score > bestScore) {
                        bestScore = score;
                        move = { row: i, col: j };
                    }
                }
            }
        }
        return move;
    }

    minimax(depth, isMaximizingPlayer) {
        let winner = this.checkTerminalState(); // Check if game ended

        if (winner!== null) {
            if (winner === 'O') return 10 - depth; // AI wins
            if (winner === 'X') return depth - 10; // Player wins
            return 0; // Draw
        }

        if (isMaximizingPlayer) { // AI's turn (maximize score)
            let bestScore = -Infinity;
            for (let i = 0; i < this.boardSize; i++) {
                for (let j = 0; j < this.boardSize; j++) {
                    if (this.board[i][j] === '') {
                        this.board[i][j] = 'O';
                        let score = this.minimax(depth + 1, false);
                        this.board[i][j] = '';
                        bestScore = Math.max(bestScore, score);
                    }
                }
            }
            return bestScore;
        } else { // Player's turn (minimize score)
            let bestScore = Infinity;
            for (let i = 0; i < this.boardSize; i++) {
                for (let j = 0; j < this.boardSize; j++) {
                    if (this.board[i][j] === '') {
                        this.board[i][j] = 'X';
                        let score = this.minimax(depth + 1, true);
                        this.board[i][j] = '';
                        bestScore = Math.min(bestScore, score);
                    }
                }
            }
            return bestScore;
        }
    }

    // Helper for minimax to check if game is over (win/draw)
    checkTerminalState() {
        const checkPlayerWin = (player) => {
            const directions = [
                [0, 1], [1, 0], [1, 1], [1, -1]
            ];

            for (let r = 0; r < this.boardSize; r++) {
                for (let c = 0; c < this.boardSize; c++) {
                    if (this.board[r][c] === player) {
                        for (const [dr, dc] of directions) {
                            let count = 1;
                            for (let i = 1; i < this.winSteps; i++) {
                                const nr = r + i * dr;
                                const nc = c + i * dc;
                                if (nr >= 0 && nr < this.boardSize && nc >= 0 && nc < this.boardSize && this.board[nr][nc] === player) {
                                    count++;
                                } else {
                                    break;
                                }
                            }
                            if (count === this.winSteps) {
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        };

        if (checkPlayerWin('O')) return 'O';
        if (checkPlayerWin('X')) return 'X';

        // Check for draw
        let isBoardFull = true;
        for (let r = 0; r < this.boardSize; r++) {
            for (let c = 0; c < this.boardSize; c++) {
                if (this.board[r][c] === '') {
                    isBoardFull = false;
                    break;
                }
            }
            if (!isBoardFull) break;
        }

        if (isBoardFull) return 'tie';

        return null; // Game not over yet
    }
}

// --- UI LOGIC (Previously script.js) ---

// UI Elements
const modeSelector = document.getElementById('mode');
const startBox = document.getElementById('startBox');
const player1NameInput = document.getElementById('player1_name');
const player2NameInput = document.getElementById('player2_name');
const boardSizeInput = document.getElementById('board_size_input');
const winStepsInput = document.getElementById('win_steps_input');
const startGameButton = document.getElementById('start-game-button');

const phaserGameContainer = document.getElementById('phaser-game-container');
const gameInfo = document.getElementById('game-info');
const displayPlayer1Name = document.getElementById('display-player1-name');
const displayPlayer2Name = document.getElementById('display-player2-name');
const playerXScoreDisplay = document.getElementById('playerXScoreDisplay');
const playerOScoreDisplay = document.getElementById('playerOScoreDisplay');
const turnDisplay = document.getElementById('turn-display');
const statusMessage = document.getElementById('status-message');
const playAgainButton = document.getElementById('playAgain-button');
const restartGameButton = document.getElementById('restart-game-button');
const backToSetupButton = document.getElementById('back-to-setup-button');

const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');
const modalPlayAgainButton = document.getElementById('modal-play-again-button');
const modalNewGameButton = document.getElementById('modal-new-game-button');

let gameInstance = null; // To hold the Phaser game instance

// --- Event Listeners ---

startGameButton.addEventListener('click', () => {
    const player1Name = player1NameInput.value.trim() || 'Player X';
    const player2Name = player2NameInput.value.trim() || 'Player O';
    const boardSize = parseInt(boardSizeInput.value, 10);
    const winSteps = parseInt(winStepsInput.value, 10);
    const gameMode = modeSelector.value;

    if (isNaN(boardSize) || boardSize < 3 || boardSize > 10) {
        alert('Board size must be a number between 3 and 10.');
        return;
    }
    if (isNaN(winSteps) || winSteps < 3 || winSteps > boardSize) {
        alert(`Steps to win must be a number between 3 and ${boardSize}.`);
        return;
    }

    // Hide setup, show game
    startBox.classList.add('hidden');
    modeSelector.parentElement.classList.add('hidden');
    phaserGameContainer.classList.remove('hidden');
    gameInfo.classList.remove('hidden');

    displayPlayer1Name.textContent = player1Name;
    displayPlayer2Name.textContent = player2Name;

    // Destroy existing game if it exists
    if (gameInstance) {
        gameInstance.destroy(true);
    }

    // Initialize the Phaser game
    gameInstance = new Phaser.Game(
        getPhaserGameConfig({
            player1Name,
            player2Name,
            boardSize,
            winSteps,
            gameMode,
            updateUI: updateGameUI, // Pass UI update function to Phaser game
            showModal: showGameModal
        })
    );
});

playAgainButton.addEventListener('click', () => {
    if (gameInstance && gameInstance.scene.scenes[0]) {
        gameInstance.scene.scenes[0].resetGame();
    }
});

restartGameButton.addEventListener('click', () => {
    if (gameInstance && gameInstance.scene.scenes[0]) {
        gameInstance.scene.scenes[0].resetGame(true); // Reset scores too
    }
});

backToSetupButton.addEventListener('click', () => {
    // Show setup, hide game
    startBox.classList.remove('hidden');
    modeSelector.parentElement.classList.remove('hidden');
    phaserGameContainer.classList.add('hidden');
    gameInfo.classList.add('hidden');

    if (gameInstance) {
        gameInstance.destroy(true); // Destroy Phaser game completely
        gameInstance = null;
    }
    // Clear status and scores
    updateGameUI({ playerXScore: 0, playerOScore: 0, turn: '', status: '' });
});

modeSelector.addEventListener('change', () => {
    if (modeSelector.value === 'pva') {
        player2NameInput.value = 'AI';
        player2NameInput.disabled = true;
    } else {
        player2NameInput.value = 'Player O';
        player2NameInput.disabled = false;
    }
});

// Modal button listeners
modalPlayAgainButton.addEventListener('click', () => {
    hideGameModal();
    if (gameInstance && gameInstance.scene.scenes[0]) {
        gameInstance.scene.scenes[0].resetGame();
    }
});

modalNewGameButton.addEventListener('click', () => {
    hideGameModal();
    backToSetupButton.click(); // Simulate click on back to setup
});

// --- UI Update Functions ---

function updateGameUI({ playerXScore, playerOScore, turn, status }) {
    if (playerXScore!== undefined) {
        playerXScoreDisplay.textContent = `X: ${playerXScore}`;
    }
    if (playerOScore!== undefined) {
        playerOScoreDisplay.textContent = `O: ${playerOScore}`;
    }
    if (turn!== undefined) {
        turnDisplay.textContent = turn;
        // Optionally update the color of the current player's name in the info board
        if (displayPlayer1Name.textContent === turn) {
            displayPlayer1Name.classList.add('is-current-turn');
            displayPlayer2Name.classList.remove('is-current-turn');
        } else if (displayPlayer2Name.textContent === turn) {
            displayPlayer2Name.classList.add('is-current-turn');
            displayPlayer1Name.classList.remove('is-current-turn');
        } else { // Handle AI, or initial state
            displayPlayer1Name.classList.remove('is-current-turn');
            displayPlayer2Name.classList.remove('is-current-turn');
        }
    }
    if (status!== undefined) {
        statusMessage.textContent = status;
    }
}

function showGameModal(message) {
    modalMessage.textContent = message;
    modal.classList.remove('hidden');
}

function hideGameModal() {
    modal.classList.add('hidden');
}

// Initial setup for AI mode if selected by default
document.addEventListener('DOMContentLoaded', () => {
    if (modeSelector.value === 'pva') {
        player2NameInput.value = 'AI';
        player2NameInput.disabled = true;
    }
});
