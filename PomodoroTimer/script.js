// Get elements
const countdownDisplay = document.getElementById('countdown-display');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const messageDisplay = document.getElementById('message-display');

const deadlineInput = document.getElementById('deadline');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const resetButton = document.getElementById('reset-button');
const errorMessageElement = document.getElementById('error-message');

const fontSizeInput = document.getElementById('font-size');
const fontSizeValueSpan = document.getElementById('font-size-value');
const fontColorInput = document.getElementById('font-color');
const backgroundColorInput = document.getElementById('background-color');
const saveSettingsButton = document.getElementById('save-settings-button');

const themeToggle = document.getElementById('theme-toggle');
const themeToggleIcon = themeToggle.querySelector('.icon');

// Global variables for countdown
let deadlineDate;
let countdownInterval;

// --- Utility Functions ---

// Function to set default deadline date (3 days from now)
function setDefaultDeadline() {
    const now = new Date();
    now.setDate(now.getDate() + 3); // Default to 3 days from now
    now.setHours(12, 0, 0, 0); // Default to 12:00 PM
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    deadlineInput.value = `${year}-${month}-${day}T${hours}:${minutes}`;
    deadlineDate = new Date(deadlineInput.value);
}

// Function to validate deadline date
function validateDeadlineDate(date) {
    const nowDate = new Date();
    // Check if the date is valid (not "Invalid Date") and is in the future
    if (isNaN(date.getTime()) || date.getTime() <= nowDate.getTime()) {
        return false;
    }
    return true;
}

// Function to display an error message
function showErrorMessage(message) {
    errorMessageElement.textContent = message;
    errorMessageElement.style.display = 'block';
    // Clear after some time, or when a valid action is taken
    setTimeout(() => {
        errorMessageElement.textContent = '';
        errorMessageElement.style.display = 'none';
    }, 5000);
}

// --- Countdown Logic ---

// Function to update countdown display
function updateCountdown() {
    const nowDate = new Date();
    const timeRemaining = deadlineDate.getTime() - nowDate.getTime();

    if (timeRemaining <= 0) {
        clearInterval(countdownInterval);
        countdownInterval = null; // Clear the interval reference
        countdownDisplay.style.display = 'none'; // Hide time units
        messageDisplay.textContent = 'TIME IS UP!';
        messageDisplay.style.display = 'block'; // Show message
        daysElement.textContent = '00';
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        return; // Exit function
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    daysElement.textContent = days.toString().padStart(2, '0');
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');

    // Ensure countdown display is visible if it was hidden
    if (countdownDisplay.style.display === 'none') {
        countdownDisplay.style.display = 'flex';
        messageDisplay.style.display = 'none';
        messageDisplay.textContent = '';
    }
    errorMessageElement.textContent = ''; // Clear error message when counting
}

// --- Settings and Theme Logic ---

// Function to apply settings
function applySettings() {
    const fontSize = fontSizeInput.value;
    const fontColor = fontColorInput.value;
    const backgroundColor = backgroundColorInput.value;

    // Apply font size to the countdown numbers
    document.querySelectorAll('.countdown-time').forEach(el => {
        el.style.fontSize = fontSize + 'px';
    });
    fontSizeValueSpan.textContent = `${fontSize}px`; // Update span next to slider

    // Apply font color to all countdown text and message
    document.querySelectorAll('.countdown-text, .countdown-time, .message-display').forEach(el => {
        el.style.color = fontColor;
    });

    // Apply background color to body (only if it's a custom setting, not theme-based)
    // For custom background, we bypass the CSS variable for body background
    // If the user wants to use a custom color, it overrides the theme
    document.body.style.setProperty('--background-color', backgroundColor);
    // Also update the card background to match or contrast if desired
    document.querySelector('main').style.setProperty('--card-background', getContrastingColor(backgroundColor));
    document.querySelectorAll('.countdown-number').forEach(el => {
        el.style.setProperty('background-color', getLighterDarkerColor(backgroundColor, 20)); // Example: make it slightly different
    });

    // Save settings to local storage
    localStorage.setItem('countdownFontSize', fontSize);
    localStorage.setItem('countdownFontColor', fontColor);
    localStorage.setItem('countdownBackgroundColor', backgroundColor);

    showErrorMessage('Settings applied and saved!', false); // Provide feedback
}

// Helper to get a slightly different color for cards/numbers based on chosen background
function getContrastingColor(hex) {
    // Function to calculate luminosity to determine if a color is light or dark
    const c = hex.substring(1);      // strip #
    const rgb = parseInt(c, 16);   // convert rrggbb to decimal
    const r = (rgb >> 16) & 0xff;  // extract red
    const g = (rgb >>  8) & 0xff;  // extract green
    const b = (rgb >>  0) & 0xff;  // extract blue

    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    if (luma < 100) { // If dark background, use a lighter card color
        return '#444'; // Darker grey card
    } else { // If light background, use a white/light grey card color
        return '#f0f0f0'; // Lighter grey card
    }
}

function getLighterDarkerColor(hex, percent) {
    var f=parseInt(hex.slice(1),16),t=percent<0?0:255,p=percent<0?p*-1:p,R=f>>16,G=(f>>8)&0x00ff,B=f&0x0000ff;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

// Load saved settings from local storage on page load
function loadSettings() {
    const savedFontSize = localStorage.getItem('countdownFontSize');
    const savedFontColor = localStorage.getItem('countdownFontColor');
    const savedBackgroundColor = localStorage.getItem('countdownBackgroundColor');

    if (savedFontSize) {
        fontSizeInput.value = savedFontSize;
    }
    if (savedFontColor) {
        fontColorInput.value = savedFontColor;
    }
    if (savedBackgroundColor) {
        backgroundColorInput.value = savedBackgroundColor;
    }
    applySettings(); // Apply loaded settings
}

// Theme toggle function
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    themeToggleIcon.textContent = isDarkMode ? '🌙' : '💡'; // Change icon based on theme
}

// --- Event Listeners ---

startButton.addEventListener('click', () => {
    // Clear any existing interval to prevent multiple timers
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    deadlineDate = new Date(deadlineInput.value);
    if (!validateDeadlineDate(deadlineDate)) {
        showErrorMessage('Please enter a future date and time for the deadline.');
        countdownDisplay.style.display = 'none'; // Hide numbers
        messageDisplay.style.display = 'block'; // Show message
        messageDisplay.textContent = 'Invalid Deadline'; // Display specific error in message area
        return;
    }
    errorMessageElement.textContent = ''; // Clear error message

    // Ensure countdown display is visible before starting
    countdownDisplay.style.display = 'flex';
    messageDisplay.style.display = 'none';
    messageDisplay.textContent = '';

    updateCountdown(); // Call immediately to avoid initial delay
    countdownInterval = setInterval(updateCountdown, 1000);
});

stopButton.addEventListener('click', () => {
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null; // Clear the interval reference
        messageDisplay.textContent = 'Timer Paused';
        messageDisplay.style.display = 'block';
        countdownDisplay.style.display = 'none';
    } else {
        showErrorMessage('Countdown is not running.');
    }
});

resetButton.addEventListener('click', () => {
    clearInterval(countdownInterval);
    countdownInterval = null; // Clear the interval reference
    setDefaultDeadline(); // Reset input to default future date
    deadlineDate = new Date(deadlineInput.value); // Set deadlineDate based on new input value

    errorMessageElement.textContent = '';
    messageDisplay.textContent = '';
    countdownDisplay.style.display = 'flex'; // Ensure numbers are visible
    messageDisplay.style.display = 'none'; // Hide message

    // Re-validate and start if the new default is valid
    if (validateDeadlineDate(deadlineDate)) {
        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);
    } else {
        // If somehow the default isn't valid (unlikely for setDefaultDeadline), show an error
        showErrorMessage('Could not reset to a valid future deadline.');
    }
});

saveSettingsButton.addEventListener('click', applySettings);

// Update font size value display when slider moves
fontSizeInput.addEventListener('input', () => {
    fontSizeValueSpan.textContent = `${fontSizeInput.value}px`;
});

themeToggle.addEventListener('click', toggleTheme);

// --- Initial Setup on Page Load ---

document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Initialize theme based on localStorage or system preference
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedDarkMode = localStorage.getItem('darkMode');

    if (savedDarkMode === 'true' || (savedDarkMode === null && prefersDarkMode)) {
        document.body.classList.add('dark-mode');
        themeToggleIcon.textContent = '🌙';
    } else {
        themeToggleIcon.textContent = '💡';
    }

    setDefaultDeadline(); // Set default date
    loadSettings(); // Load and apply saved settings
    updateCountdown(); // Display initial countdown state
});