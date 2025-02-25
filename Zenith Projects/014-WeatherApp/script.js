// script.js

const weatherForm = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');
const getWeatherBtn = document.getElementById('get-weather-btn');
const weatherDataDiv = document.getElementById('weather-data');
const weatherForecastDiv = document.getElementById('weather-forecast');

const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
        getWeatherForecast(city);
    }
});

function getWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => displayWeatherData(data))
        .catch((error) => console.error(error));
}

function getWeatherForecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => displayWeatherForecast(data))
        .catch((error) => console.error(error));
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