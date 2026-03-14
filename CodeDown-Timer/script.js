// --- DOM Element References ---
const currentDaysElement = document.getElementById('current-days');
const currentHoursElement = document.getElementById('current-hours');
const currentMinutesElement = document.getElementById('current-minutes');
const currentSecondsElement = document.getElementById('current-seconds');
const countdownMessage = document.getElementById('countdown-message');

const newDeadlineInput = document.getElementById('new-deadline');
const startNewButton = document.getElementById('start-new-countdown');
const stopCurrentButton = document.getElementById('stop-current-countdown');
const resetCurrentButton = document.getElementById('reset-current-countdown');

const enableNotificationsCheckbox = document.getElementById('enable-notifications');
const notificationThresholdInput = document.getElementById('notification-threshold');

const countdownsList = document.getElementById('countdowns-list');

// --- Global Variables ---
let currentCountdownInterval;
let currentDeadline = null; // Stores the currently active deadline as a Date object
let notificationTimeout; // To clear scheduled notification
let notificationTriggered = false; // Prevents multiple notifications for the same event

// Structure for saved countdowns { id: string, name: string, deadline: string, notificationEnabled: bool, notificationThreshold: number }
let savedCountdowns = [];

// --- Helper Functions ---

/**
 * Pads a number with a leading zero if it's less than 10.
 * @param {number} num
 * @returns {string}
 */
function padZero(num) {
    return num < 10 ? '0' + num : num;
}

/**
 * Displays the countdown in the UI.
 * @param {number} days
 * @param {number} hours
 * @param {number} minutes
 * @param {number} seconds
 */
function displayCountdown(days, hours, minutes, seconds) {
    currentDaysElement.textContent = padZero(days);
    currentHoursElement.textContent = padZero(hours);
    currentMinutesElement.textContent = padZero(minutes);
    currentSecondsElement.textContent = padZero(seconds);
}

/**
 * Clears the current countdown display.
 */
function clearCountdownDisplay() {
    displayCountdown(0, 0, 0, 0);
    countdownMessage.textContent = '';
}

/**
 * Calculates remaining time and updates the display for the current countdown.
 */
function updateCurrentCountdown() {
    if (!currentDeadline) {
        clearCountdownDisplay();
        return;
    }

    const now = new Date();
    const timeRemaining = currentDeadline.getTime() - now.getTime();

    if (timeRemaining <= 0) {
        clearInterval(currentCountdownInterval);
        currentCountdownInterval = null;
        displayCountdown(0, 0, 0, 0);
        countdownMessage.textContent = 'TIME IS UP!';
        clearNotificationTimeout();
        // Optionally, remove finished countdown from saved list
        savedCountdowns = savedCountdowns.filter(c => c.deadline !== currentDeadline.toISOString());
        saveCountdownsToLocalStorage();
        renderSavedCountdowns();
        return;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    displayCountdown(days, hours, minutes, seconds);

    // --- Notification Logic ---
    const notificationsEnabled = enableNotificationsCheckbox.checked;
    const thresholdMinutes = parseInt(notificationThresholdInput.value, 10);
    const notificationTimeMillis = thresholdMinutes * 60 * 1000;

    if (notificationsEnabled && timeRemaining <= notificationTimeMillis && !notificationTriggered) {
        if (timeRemaining > 0) { // Only trigger if there's actually time remaining
            clearNotificationTimeout(); // Clear any previous scheduled notification
            notificationTimeout = setTimeout(() => {
                alert(`Countdown Alert: Less than ${thresholdMinutes} minutes remaining until ${currentDeadline.toLocaleString()}!`);
                notificationTriggered = true; // Mark as triggered for this event
            }, timeRemaining - (thresholdMinutes * 60 * 1000)); // Schedule precisely at the threshold
        }
    } else if (!notificationsEnabled || timeRemaining > notificationTimeMillis) {
        // If notifications are disabled or time is past the threshold, reset trigger
        notificationTriggered = false;
        clearNotificationTimeout();
    }
}

/**
 * Starts a new countdown based on the provided deadline.
 * @param {Date} deadline Date object for the deadline.
 */
function startCountdown(deadline) {
    if (currentCountdownInterval) {
        clearInterval(currentCountdownInterval);
    }
    clearNotificationTimeout(); // Clear any pending notification from previous countdown

    currentDeadline = deadline;
    notificationTriggered = false; // Reset notification trigger for the new countdown
    countdownMessage.textContent = ''; // Clear any previous message

    // Run immediately and then every second
    updateCurrentCountdown();
    currentCountdownInterval = setInterval(updateCurrentCountdown, 1000);
}

/**
 * Stops the currently active countdown.
 */
function stopCountdown() {
    if (currentCountdownInterval) {
        clearInterval(currentCountdownInterval);
        currentCountdownInterval = null;
        countdownMessage.textContent = 'Countdown Paused.';
        clearNotificationTimeout();
    }
}

/**
 * Resets the current countdown.
 * If there's a deadline, it restarts it. Otherwise, it clears the display.
 */
function resetCountdown() {
    if (currentDeadline) {
        startCountdown(currentDeadline); // Restart with the same deadline
        countdownMessage.textContent = 'Countdown Reset.';
    } else {
        clearCountdownDisplay();
        stopCountdown();
    }
}

/**
 * Clears any pending notification timeout.
 */
function clearNotificationTimeout() {
    if (notificationTimeout) {
        clearTimeout(notificationTimeout);
        notificationTimeout = null;
    }
}

/**
 * Loads saved countdowns from local storage.
 */
function loadCountdownsFromLocalStorage() {
    const storedCountdowns = localStorage.getItem('savedCountdowns');
    if (storedCountdowns) {
        savedCountdowns = JSON.parse(storedCountdowns);
    }
}

/**
 * Saves current countdowns to local storage.
 */
function saveCountdownsToLocalStorage() {
    localStorage.setItem('savedCountdowns', JSON.stringify(savedCountdowns));
}

/**
 * Renders the list of saved countdowns in the UI.
 */
function renderSavedCountdowns() {
    countdownsList.innerHTML = ''; // Clear existing list

    if (savedCountdowns.length === 0) {
        const messageItem = document.createElement('li');
        messageItem.textContent = 'No saved countdowns yet.';
        countdownsList.appendChild(messageItem);
        return;
    }

    savedCountdowns.forEach(countdown => {
        const listItem = document.createElement('li');

        const deadlineDate = new Date(countdown.deadline);
        const now = new Date();
        let statusText = '';
        if (deadlineDate.getTime() < now.getTime()) {
            statusText = ' (FINISHED)';
            listItem.classList.add('finished-countdown');
        } else {
            statusText = '';
        }

        listItem.innerHTML = `
            <span>${countdown.name || 'Untitled Countdown'} - ${deadlineDate.toLocaleString()}${statusText}</span>
            <div>
                <button data-id="${countdown.id}" class="load-countdown-button">Load</button>
                <button data-id="${countdown.id}" class="delete-countdown-button delete">Delete</button>
            </div>
        `;
        countdownsList.appendChild(listItem);
    });
}

/**
 * Generates a unique ID for new countdowns.
 * @returns {string}
 */
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// --- Event Listeners ---

// Start new countdown from input
startNewButton.addEventListener('click', () => {
    const newDeadlineString = newDeadlineInput.value;
    if (newDeadlineString) {
        const newDate = new Date(newDeadlineString);
        if (isNaN(newDate.getTime())) {
            alert('Please enter a valid date and time.');
            return;
        }

        startCountdown(newDate);

        // Optionally, add to saved countdowns if not already present
        const isAlreadySaved = savedCountdowns.some(c => c.deadline === newDate.toISOString());
        if (!isAlreadySaved) {
            savedCountdowns.push({
                id: generateUniqueId(),
                name: `Event ${savedCountdowns.length + 1}`, // Simple naming for now
                deadline: newDate.toISOString(),
                notificationEnabled: enableNotificationsCheckbox.checked,
                notificationThreshold: parseInt(notificationThresholdInput.value, 10)
            });
            saveCountdownsToLocalStorage();
            renderSavedCountdowns();
        }

        // Clear input after starting
        newDeadlineInput.value = '';

    } else {
        alert('Please set a deadline first!');
    }
});

stopCurrentButton.addEventListener('click', stopCountdown);
resetCurrentButton.addEventListener('click', resetCountdown);

// Handle loading/deleting saved countdowns
countdownsList.addEventListener('click', (event) => {
    const target = event.target;
    const countdownId = target.dataset.id;

    if (target.classList.contains('load-countdown-button')) {
        const countdownToLoad = savedCountdowns.find(c => c.id === countdownId);
        if (countdownToLoad) {
            // Set input value and start countdown
            const deadlineIsoString = countdownToLoad.deadline;
            newDeadlineInput.value = deadlineIsoString.substring(0, deadlineIsoString.lastIndexOf(':')) || deadlineIsoString; // Format for datetime-local
            enableNotificationsCheckbox.checked = countdownToLoad.notificationEnabled;
            notificationThresholdInput.value = countdownToLoad.notificationThreshold;
            startCountdown(new Date(countdownToLoad.deadline));
        }
    } else if (target.classList.contains('delete-countdown-button')) {
        if (confirm('Are you sure you want to delete this countdown?')) {
            savedCountdowns = savedCountdowns.filter(c => c.id !== countdownId);
            saveCountdownsToLocalStorage();
            renderSavedCountdowns();
            // If the deleted countdown was the currently active one, stop it
            if (currentDeadline && currentDeadline.toISOString() === savedCountdowns.find(c => c.id === countdownId)?.deadline) {
                 stopCountdown();
                 clearCountdownDisplay();
            }
        }
    }
});

// --- Initial Setup ---
document.addEventListener('DOMContentLoaded', () => {
    // Set default value for datetime-local (e.g., tomorrow at noon)
    const now = new Date();
    now.setDate(now.getDate() + 1); // Tomorrow
    now.setHours(12, 0, 0, 0); // Noon
    newDeadlineInput.value = now.toISOString().substring(0, 16); // Format for datetime-local input

    // Load and render saved countdowns
    loadCountdownsFromLocalStorage();
    renderSavedCountdowns();

    // Start a default countdown if there's one saved or a previous active one
    if (savedCountdowns.length > 0) {
        // You could load the most recent or a specific one here.
        // For simplicity, let's just make sure the display is clear initially.
        clearCountdownDisplay();
    }
});