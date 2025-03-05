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

currentWeatherBtn.addEventListener('click', () => {
    weatherDataDiv.style.display = 'block';
    weatherForecastDiv.style.display = 'none';
    currentWeatherBtn.classList.add('active');
    weatherForecastBtn.classList.remove('active');
});

weatherForecastBtn.addEventListener('click', () => {
    weatherDataDiv.style.display = 'none';
    weatherForecastDiv.style.display = 'block';
    weatherForecastBtn.classList.add('active');
    currentWeatherBtn.classList.remove('active');
});

// Add animation to the loading indicator
loadingIndicatorDiv.addEventListener('animationstart', () => {
    console.log('Loading animation started');
});

loadingIndicatorDiv.addEventListener('animationend', () => {
    console.log('Loading animation ended');
});

// Use the Web Notifications API to provide alerts and notifications
if ('Notification' in window) {
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notifications are enabled');
        } else {
            console.log('Notifications are not enabled');
        }
    });
}

// Use the Web Storage API to store user preferences
if ('localStorage' in window) {
    const storedCity = localStorage.getItem('city');
    if (storedCity) {
        cityInput.value = storedCity;
    }
}

cityInput.addEventListener('input', () => {
    localStorage.setItem('city', cityInput.value);
});

// Use the Web Workers API to perform background tasks
if ('Worker' in window) {
    const worker = new Worker('worker.js');
    worker.addEventListener('message', (event) => {
        console.log(`Received message from worker: ${event.data}`);
    });
}

// Use the Web Notifications API to provide alerts and notifications
if ('Notification' in window) {
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notifications are enabled');
        } else {
            console.log('Notifications are not enabled');
        }
    });
}

// Use the Web Storage API to store user preferences
if ('localStorage' in window) {
    const storedCity = localStorage.getItem('city');
    if (storedCity) {
        cityInput.value = storedCity;
    }
}

cityInput.addEventListener('input', () => {
    localStorage.setItem('city', cityInput.value);
});