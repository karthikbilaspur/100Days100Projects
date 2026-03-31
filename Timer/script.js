// --- Timer Variables ---
let timerIntervalId = null;     // Stores the ID for requestAnimationFrame
let remainingTime = 0;          // Total seconds remaining for countdown, or elapsed for count-up
let timerRunning = false;
let startTime = 0;              // Timestamp when timer started/resumed
let lastFrameTime = 0;          // Timestamp of the last animation frame
let elapsedPausedTime = 0;      // Total time counted down *before* pausing (for countdown mode)
let initialSetTime = 0;         // Store the initial time set in seconds
let timerMode = 'countdown';    // 'countdown' or 'countup'
let notificationPermissionGranted = false; // Tracks notification permission
let alarmMuted = false;         // Controls alarm sound
const originalDocumentTitle = document.title; // Store original title

// --- DOM Elements ---
const timerCard = document.getElementById('timer-card');
const timerDisplay = document.getElementById('timer-display');
const countdownMessage = document.getElementById('countdown-message');
const timerModeSelector = document.getElementById('timer-mode');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const stopButton = document.getElementById('stop-button');
const resetButton = document.getElementById('reset-button');
const hoursInput = document.getElementById('hours-input');
const minutesInput = document.getElementById('minutes-input');
const secondsInput = document.getElementById('seconds-input');
const setTimerButton = document.getElementById('set-timer-button');
const clearInputsButton = document.getElementById('clear-inputs-button');
const alarmSound = document.getElementById('alarm-sound');
const progressBar = document.querySelector('.progress-bar');
const muteButton = document.getElementById('mute-button');       // New mute button
const fullscreenButton = document.getElementById('fullscreen-button'); // New fullscreen button

// --- Event Listeners ---
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
setTimerButton.addEventListener('click', () => setTimer(true));
clearInputsButton.addEventListener('click', clearInputFields);
timerModeSelector.addEventListener('change', handleModeChange);
muteButton.addEventListener('click', toggleMute);             // New listener
fullscreenButton.addEventListener('click', toggleFullScreen); // New listener

// Ensure inputs only accept non-negative values and handle paste
[hoursInput, minutesInput, secondsInput].forEach(input => {
    input.addEventListener('input', (e) => {
        let value = parseInt(e.target.value, 10);
        if (isNaN(value) || value < 0) {
            e.target.value = 0;
        }
        // Specific clamping for minutes and seconds
        if (e.target.id === 'minutes-input' || e.target.id === 'seconds-input') {
            e.target.value = Math.min(parseInt(e.target.max, 10), Math.max(0, value));
        }
        // Ensure values are displayed with leading zeros for consistency after input
        e.target.value = String(e.target.value).padStart(2, '0');
    });
    input.addEventListener('focus', (e) => e.target.select()); // Select all text on focus
    input.addEventListener('paste', (e) => {
        const paste = (e.clipboardData || window.clipboardData).getData('text');
        if (!/^\d+$/.test(paste)) { // Allow only numbers
            e.preventDefault();
        }
    });
});

// Initial setup on page load
document.addEventListener('DOMContentLoaded', () => {
    loadStateFromLocalStorage(); // Load previous state
    updateTimerDisplay(remainingTime);
    updateButtonStates();
    requestNotificationPermission(); // Ask for notification permission
    alarmSound.volume = 0.7; // Set default alarm volume
    muteButton.querySelector('i').className = alarmMuted ? 'fas fa-volume-off' : 'fas fa-volume-up';
    alarmSound.muted = alarmMuted;
});

// --- Notification API ---
function requestNotificationPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                notificationPermissionGranted = true;
            } else {
                notificationPermissionGranted = false;
            }
        });
    }
}

function sendNotification(title, body) {
    if (notificationPermissionGranted && document.hidden) { // Only send if permission granted and tab is not active
        new Notification(title, { body: body, icon: 'favicon-32x32.png', tag: 'timer-finished' }); // Use tag to prevent duplicate notifications
    }
}

// --- Local Storage ---
function saveStateToLocalStorage() {
    const state = {
        remainingTime: remainingTime,
        initialSetTime: initialSetTime,
        timerMode: timerMode,
        hoursInput: hoursInput.value,
        minutesInput: minutesInput.value,
        secondsInput: secondsInput.value
    };
    localStorage.setItem('karthikTimerState', JSON.stringify(state));
}

function loadStateFromLocalStorage() {
    const savedState = localStorage.getItem('karthikTimerState');
    if (savedState) {
        const state = JSON.parse(savedState);
        remainingTime = state.remainingTime;
        initialSetTime = state.initialSetTime;
        timerMode = state.timerMode;
        hoursInput.value = state.hoursInput;
        minutesInput.value = state.minutesInput;
        secondsInput.value = state.secondsInput;

        timerModeSelector.value = timerMode; // Set mode selector
        updateTimerDisplay(remainingTime);
        updateProgressBar();
        // If it was counting down/up and browser was closed, it would be 'paused' state
        // Re-calculate elapsedPausedTime based on remainingTime vs initialSetTime for proper 'resume'
        if (timerMode === 'countdown') {
            elapsedPausedTime = initialSetTime - remainingTime;
        } else { // countup
            elapsedPausedTime = remainingTime;
        }
    }
}

// --- Timer Core Logic ---
function startTimer() {
    if (timerRunning) return;

    countdownMessage.classList.add('hidden'); // Hide "Time's Up!"
    alarmSound.pause();
    alarmSound.currentTime = 0;

    if (timerMode === 'countdown') {
        if (initialSetTime === 0 || remainingTime <= 0) {
            setTimer(false); // Try to set from inputs if initial time is 0 or already finished
            if (initialSetTime === 0 || remainingTime <= 0) {
                alert("Please set a time greater than 0 for countdown mode!");
                return;
            }
        }
        document.title = `${timerDisplay.textContent} - Countdown`;
    } else { // countup
        if (initialSetTime > 0) { // Count up to a target
            document.title = `${timerDisplay.textContent} / ${formatTime(initialSetTime)} - Count-Up`;
        } else { // Indefinite count up
            document.title = `${timerDisplay.textContent} - Count-Up`;
        }
        if (initialSetTime > 0 && remainingTime >= initialSetTime) {
            // If already at target for count-up, reset to 0 before starting new count-up
            remainingTime = 0;
            elapsedPausedTime = 0;
            updateTimerDisplay(remainingTime);
            updateProgressBar();
        }
    }

    timerRunning = true;
    lastFrameTime = performance.now(); // Initialize lastFrameTime for current run
    
    // Adjust startTime based on elapsedPausedTime for seamless resume
    startTime = performance.now() - (elapsedPausedTime * 1000);
    elapsedPausedTime = 0; // Clear it once we're actually running again

    timerIntervalId = requestAnimationFrame(updateTimerLogic);
    updateButtonStates();
}

function updateTimerLogic(timestamp) {
    if (!timerRunning) {
        document.title = originalDocumentTitle; // Reset title if timer stops unexpectedly
        return;
    }

    const deltaTime = (timestamp - lastFrameTime) / 1000; // Time passed since last frame in seconds
    lastFrameTime = timestamp; // Update lastFrameTime for next frame

    if (timerMode === 'countdown') {
        remainingTime -= deltaTime;
        if (remainingTime <= 0) {
            remainingTime = 0;
            stopTimer(true); // Triggered by zero
            updateProgressBar();
            return; // Stop animation loop
        }
    } else { // countup
        remainingTime += deltaTime;
        if (initialSetTime > 0 && remainingTime >= initialSetTime) {
            remainingTime = initialSetTime;
            stopTimer(true);
            updateProgressBar();
            return;
        }
    }

    updateTimerDisplay(remainingTime);
    updateProgressBar();
    updateDocumentTitle(); // Update browser tab title
    timerIntervalId = requestAnimationFrame(updateTimerLogic);
}

function pauseTimer() {
    if (!timerRunning) return;

    timerRunning = false;
    cancelAnimationFrame(timerIntervalId);
    
    // Store how much real time has passed for precise resume
    if (timerMode === 'countdown') {
        elapsedPausedTime = initialSetTime - remainingTime;
    } else { // countup
        elapsedPausedTime = remainingTime;
    }
    document.title = `PAUSED - ${timerDisplay.textContent}`;
    updateButtonStates();
    saveStateToLocalStorage(); // Save state on pause
}

function stopTimer(triggeredByZero = false) {
    if (!timerRunning && !triggeredByZero) return;

    timerRunning = false;
    cancelAnimationFrame(timerIntervalId);
    
    elapsedPausedTime = 0; // Reset stored elapsed time
    
    if (triggeredByZero) {
        let message = '';
        if (timerMode === 'countdown') {
            remainingTime = 0; // Ensure display shows 00:00:00
            message = 'Time\'s Up!';
            sendNotification('Timer Finished!', 'Your countdown timer has ended.');
            document.title = `🔔 ${message}`;
        } else { // countup
            message = initialSetTime > 0 ? 'Target Reached!' : 'Timer Stopped!';
            sendNotification('Count-Up Ended!', 'Your count-up timer has stopped.');
            document.title = `🛑 ${message}`;
        }
        countdownMessage.textContent = message;
        countdownMessage.classList.remove('hidden');
        playAlarm();
    }
    
    updateTimerDisplay(remainingTime);
    updateProgressBar();
    updateButtonStates();
    if (!triggeredByZero) { // If manually stopped, reset title
        document.title = originalDocumentTitle;
    }
    saveStateToLocalStorage(); // Save state on stop
}

function resetTimer() {
    stopTimer(); // Stop any running timer first
    remainingTime = 0;
    initialSetTime = 0;
    elapsedPausedTime = 0;
    hoursInput.value = '00'; // Reset inputs to padded zero
    minutesInput.value = '00';
    secondsInput.value = '00';
    countdownMessage.classList.add('hidden');
    updateTimerDisplay(0);
    updateProgressBar();
    updateButtonStates();
    alarmSound.pause();
    alarmSound.currentTime = 0;
    timerModeSelector.value = 'countdown';
    handleModeChange(); // Will also call updateButtonStates and update display
    document.title = originalDocumentTitle; // Reset title
    localStorage.removeItem('karthikTimerState'); // Clear local storage on full reset
}

function clearInputFields() {
    hoursInput.value = '00';
    minutesInput.value = '00';
    secondsInput.value = '00';
    // Optionally call setTimer(true) here if clearing inputs should also reset the active timer
    // For now, it just clears the fields.
}

function setTimer(shouldResetAndStop = true) {
    let h = parseInt(hoursInput.value, 10) || 0;
    let m = parseInt(minutesInput.value, 10) || 0;
    let s = parseInt(secondsInput.value, 10) || 0;

    // Input validation (clamping values)
    h = Math.max(0, Math.min(99, h));
    m = Math.max(0, Math.min(59, m));
    s = Math.max(0, Math.min(59, s));

    hoursInput.value = String(h).padStart(2, '0');
    minutesInput.value = String(m).padStart(2, '0');
    secondsInput.value = String(s).padStart(2, '0');

    initialSetTime = (h * 3600) + (m * 60) + s;
    
    if (timerMode === 'countdown') {
        remainingTime = initialSetTime;
    } else { // countup
        remainingTime = 0; // Always start count-up from 0
    }

    if (shouldResetAndStop) {
        stopTimer();
        countdownMessage.classList.add('hidden');
        alarmSound.pause();
        alarmSound.currentTime = 0;
    }
    updateTimerDisplay(remainingTime);
    updateProgressBar();
    updateButtonStates();
    saveStateToLocalStorage(); // Save state after setting new time
}

function formatTime(totalSeconds) {
    const absSeconds = Math.abs(Math.round(totalSeconds));
    const h = Math.floor(absSeconds / 3600);
    const m = Math.floor((absSeconds % 3600) / 60);
    const s = absSeconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function updateTimerDisplay(totalSeconds) {
    timerDisplay.textContent = formatTime(totalSeconds);
}

function updateProgressBar() {
    let percentage = 0;
    if (timerMode === 'countdown' && initialSetTime > 0) {
        percentage = (remainingTime / initialSetTime) * 100;
        progressBar.style.width = `${percentage}%`;
        progressBar.style.backgroundColor = percentage <= 10 ? '#f56565' : '#66ff66';
        progressBar.classList.remove('infinite-progress');
    } else if (timerMode === 'countup' && initialSetTime > 0) { // Count-up to target
        percentage = (remainingTime / initialSetTime) * 100;
        progressBar.style.width = `${Math.min(100, percentage)}%`;
        progressBar.style.backgroundColor = percentage >= 90 ? '#f56565' : '#63b3ed';
        progressBar.classList.remove('infinite-progress');
    } else if (timerMode === 'countup' && initialSetTime === 0) { // Indefinite count-up
        progressBar.style.width = '100%';
        if (timerRunning) {
            progressBar.classList.add('infinite-progress');
        } else {
            progressBar.classList.remove('infinite-progress');
            progressBar.style.width = '0%'; // Hide bar when stopped if indefinite
        }
    } else { // Timer not set or count-up from 0, no clear progress
        progressBar.style.width = '0%';
        progressBar.classList.remove('infinite-progress');
    }
}

function updateButtonStates() {
    const isTimeSetForCountdown = timerMode === 'countdown' && initialSetTime > 0;
    const isReadyToStartCountup = timerMode === 'countup'; // Countup can always start
    const isTimerAtZero = remainingTime <= 0 && isTimeSetForCountdown; // Countdown is at zero
    const canResume = !timerRunning && (remainingTime > 0 || (timerMode === 'countup' && elapsedPausedTime > 0));

    // Controls
    startButton.classList.toggle('hidden', timerRunning);
    pauseButton.classList.toggle('hidden', !timerRunning);
    stopButton.disabled = (!timerRunning && remainingTime === 0 && initialSetTime === 0);
    resetButton.disabled = (remainingTime === 0 && initialSetTime === 0);

    // Inputs & Set button
    const disableInputs = timerRunning;
    hoursInput.disabled = disableInputs;
    minutesInput.disabled = disableInputs;
    secondsInput.disabled = disableInputs;
    setTimerButton.disabled = disableInputs || timerRunning; // Cannot set new time while running
    clearInputsButton.disabled = disableInputs;
    timerModeSelector.disabled = disableInputs;

    // Start button text and enablement
    if (canResume && !timerRunning) {
        startButton.textContent = 'Resume';
        startButton.disabled = false;
    } else if (isTimerAtZero) { // Countdown finished
        startButton.textContent = 'Start';
        startButton.disabled = true;
    } else if (timerMode === 'countdown' && initialSetTime === 0) { // Countdown, no time set
        startButton.textContent = 'Start';
        startButton.disabled = true;
    } else if (timerMode === 'countup' && initialSetTime > 0 && remainingTime >= initialSetTime) {
        // Count-up to target, already reached
        startButton.textContent = 'Start';
        startButton.disabled = true;
    } else { // Default start
        startButton.textContent = 'Start';
        startButton.disabled = false;
    }

    // Adjust set button text
    if (timerMode === 'countup' && initialSetTime === 0 && !timerRunning) {
        setTimerButton.textContent = 'Start/Set Target';
    } else {
        setTimerButton.textContent = 'Set Timer';
    }
}

function updateDocumentTitle() {
    if (timerRunning) {
        if (timerMode === 'countdown') {
            document.title = `${timerDisplay.textContent} - Countdown`;
        } else if (timerMode === 'countup' && initialSetTime > 0) {
            document.title = `${timerDisplay.textContent} / ${formatTime(initialSetTime)} - Count-Up`;
        } else {
            document.title = `${timerDisplay.textContent} - Counting Up`;
        }
    } else if (!timerRunning && remainingTime > 0) {
        document.title = `PAUSED - ${timerDisplay.textContent}`;
    } else {
        document.title = originalDocumentTitle;
    }
}

function playAlarm() {
    if (alarmSound && !alarmMuted) {
        alarmSound.play().catch(e => console.log("Alarm sound playback blocked:", e));
    }
}

function toggleMute() {
    alarmMuted = !alarmMuted;
    alarmSound.muted = alarmMuted;
    muteButton.querySelector('i').className = alarmMuted ? 'fas fa-volume-off' : 'fas fa-volume-up';
    if (alarmMuted && alarmSound.playing) {
        alarmSound.pause();
        alarmSound.currentTime = 0;
    }
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        timerCard.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (Perhaps your browser restricts this function unless initiated by user interaction)`);
        });
        fullscreenButton.querySelector('i').className = 'fas fa-compress';
    } else {
        document.exitFullscreen();
        fullscreenButton.querySelector('i').className = 'fas fa-expand';
    }
}

function handleModeChange() {
    timerMode = timerModeSelector.value;
    stopTimer(); // Always stop timer when changing mode
    resetTimer(); // And fully reset to ensure clean state and refresh UI

    if (timerMode === 'countup') {
        countdownMessage.textContent = 'Count-Up Mode';
        countdownMessage.classList.remove('hidden');
    } else { // countdown
        countdownMessage.classList.add('hidden');
    }
    updateButtonStates();
    saveStateToLocalStorage(); // Save mode change
}
