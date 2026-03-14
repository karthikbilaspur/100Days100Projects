const textEl = document.getElementById('text');
const speedEl = document.getElementById('speed');
const resetBtn = document.getElementById('reset-btn');
const nextQuoteBtn = document.getElementById('next-quote-btn');
const pausePlayBtn = document.getElementById('pause-play-btn'); // New element
let currentText = '';
let idx = 1;
let speed = 300 / speedEl.value;
let timer = null;
let isTypingPaused = false; // New flag for pause/play state

// Array of inspirational quotes (now using a copy for shuffling)
let quotes = [
    'The only way to do great work is to love what you do.',
    'Believe you can and you\'re halfway there.',
    'The future belongs to those who believe in the beauty of their dreams.',
    'It does not matter how slowly you go as long as you do not stop.',
    'Success is not final, failure is not fatal: it is the courage to continue that counts.'
];
let originalQuotes = [...quotes]; // Keep a copy of original quotes
let shuffledQuotes = [...quotes]; // Working array for shuffled quotes
let quoteIndex = 0; // Current index in the shuffledQuotes array

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startTypingEffect() {
    clearTimeout(timer); // Clear any existing timer
    isTypingPaused = false; // Ensure it's not paused when starting a new quote
    pausePlayBtn.innerText = 'Pause'; // Reset button text
    idx = 1; // Reset index for new quote

    // Check if we've gone through all shuffled quotes, then reshuffle
    if (quoteIndex >= shuffledQuotes.length) {
        shuffledQuotes = shuffleArray([...originalQuotes]); // Reshuffle from original
        quoteIndex = 0;
    }

    currentText = shuffledQuotes[quoteIndex]; // Set the text to the current quote
    textEl.innerText = ''; // Clear display instantly before typing
    writeText();
}

function writeText() {
    if (isTypingPaused) {
        return; // Stop typing if paused
    }

    textEl.innerText = currentText.slice(0, idx);
    idx++;

    if (idx > currentText.length) {
        // Stop the typing effect when the quote is fully displayed
        pausePlayBtn.innerText = 'Play'; // Change button text to 'Play' when done
        return;
    }

    timer = setTimeout(writeText, speed);
}

speedEl.addEventListener('input', (e) => {
    const speedValue = parseInt(e.target.value);
    if (!isNaN(speedValue) && speedValue >= 1 && speedValue <= 10) {
        speed = 300 / speedValue;
        // Restart typing with new speed if a quote is currently being typed
        if (idx <= currentText.length &&!isTypingPaused) { // Only restart if not paused
            startTypingEffect();
        } else if (isTypingPaused) {
            // If paused, just update the speed internally without restarting the effect
            // The next 'Play' or 'Next Quote' will use the new speed
        }
    } else {
        e.target.value = 1;
        speed = 300;
        if (idx <= currentText.length &&!isTypingPaused) {
            startTypingEffect();
        }
    }
});

resetBtn.addEventListener('click', () => {
    speedEl.value = 1;
    speed = 300;
    // Restart typing with default speed, if not paused
    if (idx <= currentText.length &&!isTypingPaused) {
        startTypingEffect();
    } else if (isTypingPaused) {
        // If paused, reset speed internally, but don't restart typing
    }
});

nextQuoteBtn.addEventListener('click', () => {
    quoteIndex++; // Move to next quote
    startTypingEffect();
});

pausePlayBtn.addEventListener('click', () => {
    isTypingPaused =!isTypingPaused; // Toggle pause state
    if (isTypingPaused) {
        clearTimeout(timer); // Stop the timer if pausing
        pausePlayBtn.innerText = 'Play';
    } else {
        // If resuming, restart typing from where it left off
        pausePlayBtn.innerText = 'Pause';
        if (idx <= currentText.length) { // Only resume if the quote isn't finished
             writeText();
        } else {
            // If quote was already finished and then paused, start a new one on play
            quoteIndex++;
            startTypingEffect();
        }
    }
});

// Initial call to shuffle and start the effect with the first quote
shuffledQuotes = shuffleArray([...originalQuotes]);
startTypingEffect();