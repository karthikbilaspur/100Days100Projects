// Function to generate a random Sudoku grid
function generateGrid(difficulty) {
    const grid = [];
    for (let i = 0; i < 9; i++) {
        grid[i] = [];
        for (let j = 0; j < 9; j++) {
            grid[i][j] = Math.floor(Math.random() * 9) + 1;
        }
    }

    // Adjust difficulty level
    if (difficulty === 'easy') {
        for (let i = 0; i < 40; i++) {
            grid[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0;
        }
    } else if (difficulty === 'medium') {
        for (let i = 0; i < 50; i++) {
            grid[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0;
        }
    } else if (difficulty === 'hard') {
        for (let i = 0; i < 60; i++) {
            grid[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0;
        }
    }

    return grid;
}

// Function to print the Sudoku grid to the page
function printGrid(grid) {
    const sudokuGrid = document.querySelector('.sudoku-grid');
    sudokuGrid.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const inputField = document.createElement('input');
            inputField.type = 'number';
            inputField.min = 1;
            inputField.max = 9;
            inputField.value = grid[i][j];
            sudokuGrid.appendChild(inputField);
        }
    }
}

// Function to solve the Sudoku puzzle
function solveSudoku(grid) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValidNumber(grid, i, j, num)) {
                        grid[i][j] = num;
                        if (solveSudoku(grid)) {
                            return true;
                        }
                        grid[i][j] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

// Function to check if a number can be placed in a cell
function isValidNumber(grid, row, col, num) {
    // Check the row
    for (let i = 0; i < 9; i++) {
        if (grid[row][i] === num) {
            return false;
        }
    }

    // Check the column
    for (let i = 0; i < 9; i++) {
        if (grid[i][col] === num) {
            return false;
        }
    }

    // Check the 3x3 box
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

// Function to provide a hint
function provideHint(grid) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValidNumber(grid, i, j, num)) {
                        grid[i][j] = num;
                        return;
                    }
                }
            }
        }
    }
}

// Function to reset the grid
function resetGrid(grid) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            grid[i][j] = 0;
        }
    }
}

// Function to change the theme
function changeTheme(theme) {
    const body = document.body;
    if (theme === 'dark') {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
}

// Event listeners
document.getElementById('generate-grid-btn').addEventListener('click', () => {
    const difficulty = document.getElementById('difficulty').value;
    const grid = generateGrid(difficulty);
    printGrid(grid);
});

document.getElementById('solve-btn').addEventListener('click', () => {
    const grid = [];
    const inputFields = document.querySelectorAll('.sudoku-grid input[type="number"]');
    for (let i = 0; i < 9; i++) {
        grid[i] = [];
        for (let j = 0; j < 9; j++) {
            const num = parseInt(inputFields[i * 9 + j].value);
            grid[i][j] = isNaN(num) ? 0 : num;
        }
    }

    if (solveSudoku(grid)) {
        printGrid(grid);
    } else {
        const errorMessage = document.createElement('p');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = 'No solution exists';
        document.body.appendChild(errorMessage);
    }
});

document.getElementById('hint-btn').addEventListener('click', () => {
    const grid = [];
    const inputFields = document.querySelectorAll('.sudoku-grid input[type="number"]');
    for (let i = 0; i < 9; i++) {
        grid[i] = [];
        for (let j = 0; j < 9; j++) {
            const num = parseInt(inputFields[i * 9 + j].value);
            grid[i][j] = isNaN(num) ? 0 : num;
        }
    }

    provideHint(grid);
    printGrid(grid);
});

document.getElementById('reset-btn').addEventListener('click', () => {
    const grid = [];
    for (let i = 0; i < 9; i++) {
        grid[i] = [];
        for (let j = 0; j < 9; j++) {
            grid[i][j] = 0;
        }
    }

    printGrid(grid);
});

document.getElementById('clear-btn').addEventListener('click', () => {
    const sudokuGrid = document.querySelector('.sudoku-grid');
    sudokuGrid.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const inputField = document.createElement('input');
            inputField.type = 'number';
            inputField.min = 1;
            inputField.max = 9;
            sudokuGrid.appendChild(inputField);
        }
    }
});

document.getElementById('theme').addEventListener('change', (e) => {
    changeTheme(e.target.value);
});