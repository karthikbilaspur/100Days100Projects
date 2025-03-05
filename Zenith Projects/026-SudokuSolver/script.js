// Game class
class Game {
    constructor() {
        this.gameGrid = Array(9).fill(null).map(() => Array(9).fill(null));
        this.completionTime = 0;
        this.hintsUsed = 0;
        this.errorsMade = 0;
        this.timerInterval = null;
        this.leaderboard = [];
        this.gameStates = [];
        this.redoStates = [];
    }

    // Initialize game
    init() {
        this.resetGame();
        this.generatePuzzle();
        this.startTimer();
        this.renderGameGrid();
        this.addEventListeners();
    }

    // Reset game
    resetGame() {
        this.gameGrid = Array(9).fill(null).map(() => Array(9).fill(null));
        this.completionTime = 0;
        this.hintsUsed = 0;
        this.errorsMade = 0;
        this.gameStates = [];
        this.redoStates = [];
    }

    // Generate puzzle
    generatePuzzle() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const num = Math.floor(Math.random() * 9) + 1;
                this.gameGrid[i][j] = num;
            }
        }

        // Remove some numbers to create puzzle
        for (let i = 0; i < 50; i++) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);
            this.gameGrid[row][col] = null;
        }
    }

    // Start timer
    startTimer() {
        this.timerInterval = setInterval(() => {
            this.completionTime++;
            document.getElementById('completion-time').innerText = `Completion Time: ${this.formatTime(this.completionTime)}`;
        }, 1000);
    }

    // Format time
    formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${this.padZero(minutes)}:${this.padZero(seconds)}`;
    }

    // Pad zero
    padZero(num) {
        return num.toString().padStart(2, '0');
    }

    // Render game grid
    renderGameGrid() {
        const gameGridElement = document.querySelector('.game-grid');
        gameGridElement.innerHTML = '';

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const cell = document.createElement('input');
                cell.type = 'number';
                cell.min = 1;
                cell.max = 9;
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.value = this.gameGrid[i][j] || '';

                gameGridElement.appendChild(cell);
            }
        }
    }

    // Add event listeners
    addEventListeners() {
        document.getElementById('new-game-btn').addEventListener('click', () => {
            this.resetGame();
            this.generatePuzzle();
            this.startTimer();
            this.renderGameGrid();
        });

        document.getElementById('hint-btn').addEventListener('click', () => {
            this.hintsUsed++;
            document.getElementById('hints-used').innerText = `Hints Used: ${this.hintsUsed}`;

            // Reveal a random cell
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);
            const cell = document.querySelector(`.game-grid input[data-row="${row}"][data-col="${col}"]`);
            cell.value = this.gameGrid[row][col];
        });

        document.getElementById('undo-btn').addEventListener('click', () => {
            this.undoMove();
        });

        document.getElementById('redo-btn').addEventListener('click', () => {
            this.redoMove();
        });

        document.getElementById('solve-btn').addEventListener('click', () => {
            this.solveGame();
        });

        document.getElementById('leaderboard-btn').addEventListener('click', () => {
            this.updateLeaderboard();
        });

        document.getElementById('save-game-btn').addEventListener('click', () => {
            this.saveGame();
        });

        document.getElementById('load-game-btn').addEventListener('click', () => {
            this.loadGame();
        });

        document.querySelectorAll('.game-grid input').forEach((cell) => {
            cell.addEventListener('input', (event) => {
                const row = event.target.dataset.row;
                const col = event.target.dataset.col;
                const num = parseInt(event.target.value);

                if (num >= 1 && num <= 9) {
                    this.gameGrid[row][col] = num;
                } else {
                    this.gameGrid[row][col] = null;
                }


    // Store game state
storeGameState() {
    this.gameStates.push(JSON.parse(JSON.stringify(this.gameGrid)));
}

// Undo move
undoMove() {
    if (this.gameStates.length > 0) {
        this.gameGrid = JSON.parse(JSON.stringify(this.gameStates.pop()));
        this.renderGameGrid();
    }
}

// Redo move
redoMove() {
    if (this.redoStates.length > 0) {
        this.gameGrid = JSON.parse(JSON.stringify(this.redoStates.pop()));
        this.renderGameGrid();
    }
}

// Solve game
solveGame() {
    const solvedGrid = this.backtrackSolve(this.gameGrid);
    if (solvedGrid) {
        this.gameGrid = solvedGrid;
        this.renderGameGrid();
    }
}

// Backtrack solve algorithm
backtrackSolve(grid) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j] === null) {
                for (let num = 1; num <= 9; num++) {
                    if (this.isValidMove(grid, i, j, num)) {
                        grid[i][j] = num;
                        if (this.backtrackSolve(grid)) {
                            return grid;
                        }
                        grid[i][j] = null;
                    }
                }
                return null;
            }
        }
    }
    return grid;
}

// Check if move is valid
isValidMove(grid, row, col, num) {
    // Check row and column
    for (let i = 0; i < 9; i++) {
        if (grid[row][i] === num || grid[i][col] === num) {
            return false;
        }
    }

    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[boxRow + i][boxCol + j] === num) {
                return false;
            }
        }
    }

    return true;
}

// Update leaderboard
updateLeaderboard() {
    const name = prompt('Enter your name:');
    const score = this.completionTime;
    this.leaderboard.push({ name, score });
    this.leaderboard.sort((a, b) => a.score - b.score);
    document.getElementById('leaderboard-list').innerHTML = '';
    this.leaderboard.forEach((entry, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${entry.name} - ${entry.score}`;
        document.getElementById('leaderboard-list').appendChild(li);
    });
}

// Save game
saveGame() {
    const gameState = {
        gameGrid: this.gameGrid,
        completionTime: this.completionTime,
        hintsUsed: this.hintsUsed,
        errorsMade: this.errorsMade,
    };
    localStorage.setItem('sudoku-game-state', JSON.stringify(gameState));
}

// Load game
loadGame() {
    const gameState = JSON.parse(localStorage.getItem('sudoku-game-state'));
    if (gameState) {
        this.gameGrid = gameState.gameGrid;
        this.completionTime = gameState.completionTime;
        this.hintsUsed = gameState.hintsUsed;
        this.errorsMade = gameState.errorsMade;
        this.renderGameGrid();
    }
}
}

// Create a new game instance
const game = new Game();
game.init();