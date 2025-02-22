// Constants
const HOUR_HAND_DEGREE = 30;
const MINUTE_HAND_DEGREE = 6;
const SECOND_HAND_DEGREE = 6;
const HOUR_HAND_MINUTE_OFFSET = 0.5;
const MINUTE_HAND_SECOND_OFFSET = 0.1;

// Selectors
const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');
const secondEl = document.querySelector('.second');
const timeEl = document.querySelector('.time');
const dateEl = document.querySelector('.date');
const themeSwitcher = document.querySelectorAll('.theme-btn'); // Change this line
const themePreview = document.querySelector('.theme-preview');

// State
let currentTheme = 'light';

// Functions
function setTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const day = now.getDay();
    const date = now.getDate();
    const month = now.getMonth();

    updateClockHand(hourEl, hours, minutes, HOUR_HAND_DEGREE, HOUR_HAND_MINUTE_OFFSET);
    updateClockHand(minuteEl, minutes, seconds, MINUTE_HAND_DEGREE, MINUTE_HAND_SECOND_OFFSET);
    updateClockHand(secondEl, seconds, 0, SECOND_HAND_DEGREE, 0);

    timeEl.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    dateEl.textContent = `${getDayOfWeek(day)}, ${getMonth(month)} ${date.toString().padStart(2, '0')}`;
}

function updateClockHand(handEl, value, offsetValue, degree, offset) {
    handEl.style.transform = `translate(-50%, -100%) rotate(${value * degree + offsetValue * offset}deg)`;
}

function getDayOfWeek(day) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[day];
}

function getMonth(month) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[month];
}

function switchTheme(theme) {
    currentTheme = theme;
    document.documentElement.classList.remove('light', 'dark', 'custom');
    document.documentElement.classList.add(theme);
    updateThemePreview();
}

function updateThemePreview() {
    const themePreviewClock = themePreview.querySelector('.theme-preview-clock');
    const themePreviewDigitalDisplay = themePreview.querySelector('.theme-preview-digital-display');

    if (currentTheme === 'light') {
        themePreviewClock.style.background = '#f7f7f7';
        themePreviewDigitalDisplay.style.color = '#333';
    } else if (currentTheme === 'dark') {
        themePreviewClock.style.background = '#333';
        themePreviewDigitalDisplay.style.color = '#fff';
    } else if (currentTheme === 'custom') {
        themePreviewClock.style.background = '#ff69b4';
        themePreviewDigitalDisplay.style.color = '#333';
    }
}

// Event listeners
themeSwitcher.forEach((btn) => {
    btn.addEventListener('click', () => {
        switchTheme(btn.dataset.theme);
    });
});

// Initialize clock
setInterval(setTime, 1000);
setTime();