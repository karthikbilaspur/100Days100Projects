// src/App.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import MapView from './components/MapView';
import Favorites from './components/Favorites';
import Settings from './components/Settings';

function App() {
  const [cities, setCities] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [unit, setUnit] = useState('metric');
  const [favorites, setFavorites] = useState([]);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const fetchWeatherData = async () => {
      const responses = await Promise.all(
        cities.map((city) =>
          axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=YOUR_API_KEY`)
        )
      );
      const weatherData = responses.map((response) => response.data);
      setWeatherData(weatherData);
    };

    fetchWeatherData();
  }, [cities, unit]);

  const handleSearch = (city: string) => {
    setCities([...cities, city]);
  };

  const handleFavorite = (city: string) => {
    setFavorites([...favorites, city]);
  };

  const handleSettingsChange = (settings: any) => {
    setSettings(settings);
  };

  return (
    <div>
      <Header />
      <SearchBar onSearch={handleSearch} />
      {weatherData.map((data, index) => (
        <WeatherCard key={index} weatherData={data} />
      ))}
      <MapView cities={cities} weatherData={weatherData} />
      <Favorites favorites={favorites} onFavorite={handleFavorite} />
      <Settings settings={settings} onSettingsChange={handleSettingsChange} />
    </div>
  );
}

export default App;