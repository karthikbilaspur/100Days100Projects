// Import the OpenWeatherMap API key from a separate file
import { apiKey } from './api-key.js';

// Define the constants
const weatherForm = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');
const getWeatherBtn = document.getElementById('get-weather-btn');
const weatherDataDiv = document.getElementById('weather-data');
const weatherForecastDiv = document.getElementById('weather-forecast');
const errorMessageDiv = document.getElementById('error-message');
const loadingIndicatorDiv = document.getElementById('loading-indicator');
const currentWeatherBtn = document.getElementById('current-weather-btn');
const weatherForecastBtn = document.getElementById('weather-forecast-btn');
const settingsBtn = document.getElementById('settings-btn');
const settingsSection = document.getElementById('settings-section');
const darkModeCheckbox = document.getElementById('dark-mode-checkbox');
const highContrastCheckbox = document.getElementById('high-contrast-checkbox');
const saveSettingsBtn = document.getElementById('save-settings-btn');

// Define the functions
async function getWeatherData(city) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getWeatherForecast(city) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

function displayWeatherData(data) {
    const weatherDataHtml = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Weather Condition: ${data.weather[0].description}</p>
    `;
    weatherDataDiv.innerHTML = weatherDataHtml;
}

function displayWeatherForecast(data) {
    const weatherForecastHtml = `
        <h2>Weather Forecast for ${data.city.name}</h2>
        <ul>
            ${data.list.map((forecast) => `
                <li>
                    <p>Date: ${forecast.dt_txt}</p>
                    <p>Temperature: ${forecast.main.temp}°C</p>
                    <p>Humidity: ${forecast.main.humidity}%</p>
                    <p>Weather Condition: ${forecast.weather[0].description}</p>
                </li>
            `).join('')}
        </ul>
    `;
    weatherForecastDiv.innerHTML = weatherForecastHtml;
}

function handleError(error) {
    errorMessageDiv.textContent = error.message;
}

function toggleLoadingIndicator(loading) {
    if (loading) {
        loadingIndicatorDiv.style.display = 'block';
    } else {
        loadingIndicatorDiv.style.display = 'none';
    }
}

function toggleDarkMode(enabled) {
    if (enabled) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

function toggleHighContrastMode(enabled) {
    if (enabled) {
        document.body.classList.add('high-contrast-mode');
    } else {
        document.body.classList.remove('high-contrast-mode');
    }
}

// Add event listeners
weatherForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
        const city = cityInput.value.trim();
        if (city) {
            toggleLoadingIndicator(true);
            const weatherData = await getWeatherData(city);
            const weatherForecast = await getWeatherForecast(city);
            displayWeatherData(weatherData);
            displayWeatherForecast(weatherForecast);
            handleError(null);
        } else {
            throw new Error('Please enter a city name');
        }
    } catch (error) {
        handleError(error);
    } finally {
        toggleLoadingIndicator(false);
    }
});

settingsBtn.addEventListener('click', () => {
    settingsSection.classList.toggle('show');
});

darkModeCheckbox.addEventListener('change', (event) => {
    toggleDarkMode(event.target.checked);
});

highContrastCheckbox.addEventListener('change', (event) => {
    toggleHighContrastMode(event.target.checked);
});

saveSettingsBtn.addEventListener('click', () => {
    localStorage.setItem('darkMode', darkModeCheckbox.checked);
    localStorage.setItem('highContrastMode', highContrastCheckbox.checked);
});

// Initialize settings
const storedDarkMode = localStorage.getItem('darkMode') === 'true';
const storedHighContrastMode = localStorage.getItem('highContrastMode') === 'true';

darkModeCheckbox.checked = storedDarkMode;
highContrastCheckbox.checked = storedHighContrastMode;

toggleDarkMode(storedDarkMode);
toggleHighContrastMode(storedHighContrastMode);

// Add event listeners for accessibility features
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        settingsSection.classList.remove('show');
    }
});

// Add ARIA attributes for accessibility
settingsBtn.setAttribute('aria-controls', 'settings-section');
settingsBtn.setAttribute('aria-expanded', 'false');

settingsSection.setAttribute('aria-labelledby', 'settings-btn');
settingsSection.setAttribute('aria-hidden', 'true');

// Update ARIA attributes when settings section is toggled
settingsBtn.addEventListener('click', () => {
    const expanded = settingsSection.classList.contains('show');
    settingsBtn.setAttribute('aria-expanded', expanded);
    settingsSection.setAttribute('aria-hidden', !expanded);
});

// Add screen reader support for settings section
settingsSection.addEventListener('transitionend', () => {
    const expanded = settingsSection.classList.contains('show');
    if (expanded) {
        settingsSection.setAttribute('aria-hidden', 'false');
    } else {
        settingsSection.setAttribute('aria-hidden', 'true');
    }
});