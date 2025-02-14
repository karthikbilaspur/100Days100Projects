// Get elements
const countdownContainer = document.querySelector('.countdown-container');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const deadlineInput = document.getElementById('deadline');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const resetButton = document.getElementById('reset-button');
const errorMessageElement = document.getElementById('error-message');
const settingsContainer = document.querySelector('.settings-container');
const fontSizeInput = document.getElementById('font-size');
const fontColorInput = document.getElementById('font-color');
const backgroundColorInput = document.getElementById('background-color');
const saveSettingsButton = document.getElementById('save-settings-button');

// Set deadline date
let deadlineDate = new Date(deadlineInput.value);

// Set countdown interval
let countdownInterval;

// Function to update countdown display
function updateCountdown() {
    const nowDate = new Date();
    const timeRemaining = deadlineDate.getTime() - nowDate.getTime();

    if (timeRemaining <= 0) {
        clearInterval(countdownInterval);
        countdownContainer.textContent = 'Time\'s up!';
    } else {
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        daysElement.textContent = days.toString().padStart(2, '0');
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
    }
}

// Function to validate deadline date
function validateDeadlineDate(date) {
    const nowDate = new Date();
    if (date.getTime() < nowDate.getTime()) {
        return false;
    }
    return true;
}

// Event listeners
startButton.addEventListener('click', () => {
    deadlineDate = new Date(deadlineInput.value);
    if (!validateDeadlineDate(deadlineDate)) {
        errorMessageElement.textContent = 'Invalid deadline date!';
        return;
    }
    errorMessageElement.textContent = '';
    countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
});

stopButton.addEventListener('click', () => {
    clearInterval(countdownInterval);
});

resetButton.addEventListener('click', () => {
    deadlineDate = new Date(deadlineInput.value);
    clearInterval(countdownInterval);
    updateCountdown();
});

saveSettingsButton.addEventListener('click', () => {
    const fontSize = fontSizeInput.value;
    const fontColor = fontColorInput.value;
    const backgroundColor = backgroundColorInput.value;

    // Save settings to local storage
    localStorage.setItem('fontSize', fontSize);
    localStorage.setItem('fontColor', fontColor);
    localStorage.setItem('backgroundColor', backgroundColor);

    // Update countdown display with new settings
    countdownContainer.style.fontSize = fontSize + 'px';
    countdownContainer.style.color = fontColor;
    document.body.style.backgroundColor = backgroundColor;
});

// Load saved settings from local storage
const savedFontSize = localStorage.getItem('fontSize');
const savedFontColor = localStorage.getItem('fontColor');
const savedBackgroundColor = localStorage.getItem('backgroundColor');

if (savedFontSize) {
    fontSizeInput.value = savedFontSize;
    countdownContainer.style.fontSize = savedFontSize + 'px';
}

if (savedFontColor) {
    fontColorInput.value = savedFontColor;
    countdownContainer.style.color = savedFontColor;
}

if (savedBackgroundColor) {
    backgroundColorInput.value = savedBackgroundColor;
    document.body.style.backgroundColor = savedBackgroundColor;
}