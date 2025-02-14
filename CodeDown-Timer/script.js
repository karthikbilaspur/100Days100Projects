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
const notificationsCheckbox = document.getElementById('notifications');
const notificationTimeInput = document.getElementById('notification-time');
const countdownsList = document.getElementById('countdowns-list');
const addCountdownButton = document.getElementById('add-countdown-button');

// Set deadline date
let deadlineDate = new Date(deadlineInput.value);

// Set countdown interval
let countdownInterval;

// Set notifications
let notificationsEnabled = notificationsCheckbox.checked;
let notificationTime = notificationTimeInput.value * 60 * 1000; // Convert minutes to milliseconds

// Set countdowns list
let countdowns = [];

// Update countdown display
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

    // Check for notifications
    if (notificationsEnabled && timeRemaining <= notificationTime) {
        alert('Notification: Time is running out!');
    }
}

// Start countdown
startButton.addEventListener('click', () => {
    deadlineDate = new Date(deadlineInput.value);
    countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
});

// Stop countdown
stopButton.addEventListener('click', () => {
    clearInterval(countdownInterval);
});

// Reset countdown
resetButton.addEventListener('click', () => {
    deadlineDate = new Date(deadlineInput.value);
    clearInterval(countdownInterval);
    updateCountdown();
});

// Enable/disable notifications
notificationsCheckbox.addEventListener('change', () => {
    notificationsEnabled = notificationsCheckbox.checked;
});

// Update notification time
notificationTimeInput.addEventListener('input', () => {
    notificationTime = notificationTimeInput.value * 60 * 1000; // Convert minutes to milliseconds
});

// Add countdown
addCountdownButton.addEventListener('click', () => {
    const newCountdown = {
        deadline: deadlineInput.value,
        notificationsEnabled: notificationsEnabled,
        notificationTime: notificationTime
    };
    countdowns.push(newCountdown);
    updateCountdownsList();
});

// Update countdowns list
function updateCountdownsList() {
    countdownsList.innerHTML = '';
    countdowns.forEach((countdown, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Countdown ${index + 1}: ${countdown.deadline}`;
        countdownsList.appendChild(listItem);
    });
}