import Phaser from 'phaser';

// Create a new Phaser game instance
const game = new Phaser.Game({
  type: Phaser.CANVAS,
  parent: 'phaser-example',
  width: 600,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update
  }
});

// Define game variables
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let playerMode = 'pvp';
let playerXScore = 0;
let playerOScore = 0;
let multiplayer = false;
let socket = null;

// Preload game assets
function preload() {}

// Create game objects
function create() {
  // Create game board
  const boardGraphics = this.add.graphics();
  boardGraphics.lineStyle(4, 0xffffff);
  boardGraphics.drawRect(100, 100, 400, 400);
  boardGraphics.lineStyle(4, 0xffffff);
  boardGraphics.moveTo(250, 100);
  boardGraphics.lineTo(250, 500);
  boardGraphics.moveTo(350, 100);
  boardGraphics.lineTo(350, 500);
  boardGraphics.moveTo(100, 250);
  boardGraphics.lineTo(500, 250);
  boardGraphics.moveTo(100, 350);
  boardGraphics.lineTo(500, 350);

  // Create score text
  this.scoreText = this.add.text(10, 10, `Player X: ${playerXScore} | Player O: ${playerOScore}`, {
    fontSize: 24,
    fill: '#ffffff'
  });

  // Create turn text
  this.turnText = this.add.text(10, 50, `Turn: Player ${currentPlayer}`, {
    fontSize: 24,
    fill: '#ffffff'
  });

  // Create game over text
  this.gameOverText = this.add.text(200, 300, '', {
    fontSize: 36,
    fill: '#ffffff'
  });

  // Create restart button
  this.restartButton = this.add.text(200, 400, 'Restart', {
    fontSize: 24,
    fill: '#ffffff'
  });
  this.restartButton.setInteractive();
  this.restartButton.on('pointerdown', restartGame);

  // Create cells
  this.cells = [];
  for (let i = 0; i < 9; i++) {
    const cell = this.add.graphics();
    cell.fillStyle(0xffffff);
    cell.fillRect(100 + (i % 3) * 133, 100 + Math.floor(i / 3) * 133, 133, 133);
    cell.setInteractive();
    cell.on('pointerdown', () => handleCellClick(i));
    this.cells.push(cell);
  }

  // Initialize multiplayer
  if (playerMode === 'multiplayer') {
    multiplayer = true;
    socket = io();
    socket.on('connect', () => {
      console.log('Connected to server');
    });
    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
    socket.on('move', (data) => {
      handleCellClick(data.index);
    });
  }
}

// Update game state
function update() {}

// Handle cell click
function handleCellClick(index) {
  if (gameActive && board[index] === '') {
    board[index] = currentPlayer;
    updateBoard();
    checkWinner();
    if (playerMode === 'pva') {
      handleAIMove();
    } else if (multiplayer) {
      socket.emit('move', { index: index });
    }
  }
}

// Update game board
function updateBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = board[i];
    if (cell === 'X' || cell === 'O') {
      const cellGraphics = game.scene.scenes[0].cells[i];
      cellGraphics.fillStyle(0xffffff);
      cellGraphics.fillRect(100 + (i % 3) * 133, 100 + Math.floor(i / 3) * 133, 133, 133);
      const cellText = game.scene.scenes[0].add.text(100 + (i % 3) * 133 + 65, 100 + Math.floor(i / 3) * 133 + 65, cell, {
        fontSize: 64,
        fill: '#000000'
      });
    }
  }
}

// Check for winner
function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      game.scene.scenes[0].gameOverText.text = `Player ${board[a]} wins!`;
      gameActive = false;
      return;
    }
  }

  if (!board.includes('')) {
    game.scene.scenes[0].gameOverText.text = 'It\'s a draw!';
    gameActive = false;
  }
}

  // Random move for first turn
  if (board.filter(cell => cell !== '').length === 1) {
    bestMove = getRandomMove();
  } else {
    // Strategic move for subsequent turns
    bestMove = getBestMove();
  }

  handleCellClick(bestMove);
}

// Get random move
function getRandomMove() {
  const emptyCells = board.reduce((acc, cell, index) => {
    if (cell === '') {
      acc.push(index);
    }
    return acc;
  }, []);

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
}

// Get best move
function getBestMove() {
  let bestScore = -Infinity;
  let bestMove;

  for (let i = 0; i < 9; i++) {
    if (board[i] === '') {
      board[i] = 'O';
      let score = minimax(board, 0, false);
      board[i] = '';

      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  return bestMove;
}

// Minimax algorithm
function minimax(board, depth, isMaximizing) {
  const scores = {
    X: -1,
    O: 1,
    tie: 0
  };

  const winner = checkWinner();
  if (winner !== null) {
    return scores[winner] / depth;
  }

  if (isBoardFull()) {
    return 0;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = 'O';
        let score = minimax(board, depth + 1, false);
        board[i] = '';
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = 'X';
        let score = minimax(board, depth + 1, true);
        board[i] = '';
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

// Check if board is full
function isBoardFull() {
  return !board.includes('');
}

// Update turn text
function updateTurn() {
  game.scene.scenes[0].turnText.text = `Turn: Player ${currentPlayer}`;
}

// Switch player turn
function switchPlayerTurn() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateTurn();
}

// Handle multiplayer move
function handleMultiplayerMove(index) {
  if (gameActive && board[index] === '') {
    board[index] = currentPlayer;
    updateBoard();
    checkWinner();
    socket.emit('move', { index: index });
  }
}

// Initialize socket.io
const Socket = io();

// Handle socket.io events
socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('move', (data) => {
  handleMultiplayerMove(data.index);
});