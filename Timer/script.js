let timerInterval = null;
let hours = 0;
let minutes = 0;
let seconds = 0;
let timerRunning = false;

const timerDisplay = document.getElementById('timer-display');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const resetButton = document.getElementById('reset-button');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const setTimerButton = document.getElementById('set-timer-button');

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
setTimerButton.addEventListener('click', setTimer);

function startTimer() {
    if (!timerRunning) {
        timerInterval = setInterval(() => {
            seconds--;
            if (seconds === -1) {
                minutes--;
                seconds = 59;
            }
            if (minutes === -1) {
                hours--;
                minutes = 59;
            }
            if (hours === -1) {
                stopTimer();
            } else {
                updateTimerDisplay();
            }
        }, 1000);
        timerRunning = true;
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
}

function resetTimer() {
    stopTimer();
    hours = 0;
    minutes = 0;
    seconds = 0;
    updateTimerDisplay();
}

function setTimer() {
    hours = parseInt(hoursInput.value);
    minutes = parseInt(minutesInput.value);
    seconds = parseInt(secondsInput.value);
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const hoursString = hours.toString().padStart(2, '0');
    const minutesString = minutes.toString().padStart(2, '0');
    const secondsString = seconds.toString().padStart(2, '0');
    timerDisplay.textContent = `${hoursString}:${minutesString}:${secondsString}`;
}