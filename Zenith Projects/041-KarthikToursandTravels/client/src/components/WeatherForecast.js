import React from 'react';

const WeatherForecast = ({ weather }) => {
  return (
    <div>
      <h2>Weather Forecast:</h2>
      <p>Temperature: {weather.temperature}</p>
      <p>Condition: {weather.condition}</p>
    </div>
  );
};

export default WeatherForecast;