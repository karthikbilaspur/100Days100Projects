const container = document.getElementById('container');
const colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71'];
let SQUARES_PER_ROW = 25; // This will be dynamic based on SQUARES
let SQUARES = parseInt(localStorage.getItem('boardSize')) || 500; // Load from localStorage or default
let rippleRadius = parseInt(localStorage.getItem('rippleRadius')) || 2; // Load from localStorage or default
let fadeDuration = parseInt(localStorage.getItem('fadeDuration')) || 500; // Load from localStorage or default

let squaresArray = []; // To store references to all squares for easier access

// --- Initial Setup ---
function initializeBoard() {
    container.innerHTML = ''; // Clear existing squares if re-initializing
    squaresArray = []; // Clear array

    // Calculate SQUARES_PER_ROW based on container width and square size for better consistency
    // Assuming square width + margin is 16px + 2*2px = 20px
    const containerWidth = container.offsetWidth; // Get computed width
    if (containerWidth > 0) { // Ensure container has a width
        SQUARES_PER_ROW = Math.floor(containerWidth / 20);
    } else {
        SQUARES_PER_ROW = 25; // Fallback if container width can't be determined yet
    }

    // Adjust SQUARES to be a multiple of SQUARES_PER_ROW for a clean grid
    SQUARES = Math.ceil(SQUARES / SQUARES_PER_ROW) * SQUARES_PER_ROW;

    for(let i = 0; i < SQUARES; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.dataset.index = i; // Add an index for easy referencing
        square.addEventListener('mouseover', () => handleHover(square, i));
        square.addEventListener('mouseout', () => handleLeave(square, i));
        container.appendChild(square);
        squaresArray.push(square);
    }
}

// Initial board creation
initializeBoard();

// Recalculate board on resize to maintain correct SQUARES_PER_ROW
window.addEventListener('resize', () => {
    // Only re-initialize if SQUARES_PER_ROW would change significantly
    const currentContainerWidth = container.offsetWidth;
    const newSquaresPerRow = Math.floor(currentContainerWidth / 20);
    if (newSquaresPerRow!== SQUARES_PER_ROW && newSquaresPerRow > 0) {
        initializeBoard();
    }
});

// --- Hover Effect Logic ---
function handleHover(element, index) {
    const color = getRandomColor();
    setColor(element, color);

    const row = Math.floor(index / SQUARES_PER_ROW);
    const col = index % SQUARES_PER_ROW;

    for (let r = row - rippleRadius; r <= row + rippleRadius; r++) {
        for (let c = col - rippleRadius; c <= col + rippleRadius; c++) {
            if (r >= 0 && r < SQUARES / SQUARES_PER_ROW && c >= 0 && c < SQUARES_PER_ROW) {
                const targetIndex = r * SQUARES_PER_ROW + c;
                if (targetIndex >= 0 && targetIndex < SQUARES) {
                    const targetSquare = squaresArray[targetIndex];
                    if (targetSquare && targetSquare!== element) {
                        const dist = Math.sqrt(Math.pow(r - row, 2) + Math.pow(c - col, 2));
                        const delay = dist * 50;

                        setTimeout(() => {
                            if (targetSquare.dataset.hovered === 'false' ||!targetSquare.dataset.hovered) { // Only affect non-hovered squares
                                setColor(targetSquare, color, true);
                                setTimeout(() => removeColor(targetSquare, true), fadeDuration);
                            }
                        }, delay);
                    }
                }
            }
        }
    }
}

function handleLeave(element, index) {
    removeColor(element);
}

function setColor(element, color, isRipple = false) {
    element.style.background = color;
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
    if (isRipple) {
        element.classList.add('ripple-active');
    } else {
        element.dataset.hovered = 'true'; // Mark as directly hovered
    }
}

function removeColor(element, isRipple = false) {
    if (isRipple &&!element.classList.contains('ripple-active')) {
        return;
    }
    if (!isRipple) {
        element.dataset.hovered = 'false'; // Mark as no longer directly hovered
    }
    element.style.background = getComputedStyle(document.body).getPropertyValue('--square-bg-dark'); // Use CSS variable for default color
    element.style.boxShadow = '0 0 2px #000';
    element.classList.remove('ripple-active');
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

// --- Modals Logic ---
const infoModal = document.getElementById('infoModal');
const settingsModal = document.getElementById('settingsModal');
const infoButton = document.getElementById('info-button');
const settingsButton = document.getElementById('settings-button');
const closeButtons = document.querySelectorAll('.close-button');

infoButton.addEventListener('click', () => infoModal.classList.add('active'));
settingsButton.addEventListener('click', () => settingsModal.classList.add('active'));

closeButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.target.closest('.modal').classList.remove('active');
    });
});

window.addEventListener('click', (event) => {
    if (event.target === infoModal) {
        infoModal.classList.remove('active');
    }
    if (event.target === settingsModal) {
        settingsModal.classList.remove('active');
    }
});

// --- Dark/Light Mode Toggle Logic ---
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Load theme preference from localStorage
const currentTheme = localStorage.getItem('theme') || 'dark'; // Default to dark if no preference saved
if (currentTheme === 'light') {
    body.classList.remove('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Show moon icon for light mode
} else {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Show sun icon for dark mode
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    // Re-apply base square color based on new theme
    squaresArray.forEach(square => {
        if (!square.dataset.hovered || square.dataset.hovered === 'false') {
             removeColor(square);
        }
    });
});

// --- Settings Modals Functionality ---
const rippleRadiusSlider = document.getElementById('rippleRadiusSlider');
const rippleRadiusValue = document.getElementById('rippleRadiusValue');
const fadeDurationSlider = document.getElementById('fadeDurationSlider');
const fadeDurationValue = document.getElementById('fadeDurationValue');
const boardSizeSlider = document.getElementById('boardSizeSlider');
const boardSizeValue = document.getElementById('boardSizeValue');

// Initialize settings from saved values
rippleRadiusSlider.value = rippleRadius;
rippleRadiusValue.textContent = rippleRadius;
fadeDurationSlider.value = fadeDuration;
fadeDurationValue.textContent = fadeDuration;
boardSizeSlider.value = SQUARES;
boardSizeValue.textContent = SQUARES;

// Event Listeners for settings changes
rippleRadiusSlider.addEventListener('input', (event) => {
    rippleRadius = parseInt(event.target.value);
    rippleRadiusValue.textContent = rippleRadius;
    localStorage.setItem('rippleRadius', rippleRadius);
});

fadeDurationSlider.addEventListener('input', (event) => {
    fadeDuration = parseInt(event.target.value);
    fadeDurationValue.textContent = fadeDuration;
    localStorage.setItem('fadeDuration', fadeDuration);
});

boardSizeSlider.addEventListener('change', (event) => { // Use 'change' for a full update, 'input' for live
    SQUARES = parseInt(event.target.value);
    boardSizeValue.textContent = SQUARES;
    localStorage.setItem('boardSize', SQUARES);
    // Reload the board to apply new square count
    initializeBoard();
});

function handleError(error) {
    console.error('Error:', error);
    // alert('An error occurred. Please try again later.'); // Consider if alert is desirable in production
}