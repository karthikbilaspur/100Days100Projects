// src/components/WeatherCard.tsx

import React from 'react';

interface Props {
  weatherData: any;
}

const WeatherCard = ({ weatherData }: Props) => {
  return (
    <div className="bg-white shadow-md p-4 rounded">
      <h2 className="text-lg font-bold mb-2">{weatherData.name}</h2>
      <p className="text-gray-600">{weatherData.weather[0].description}</p>
      <p className="text-lg font-bold">{weatherData.main.temp}°C</p>
      <p className="text-gray-600">Humidity: {weatherData.main.humidity}%</p>
    </div>
  );
};

export default WeatherCard;