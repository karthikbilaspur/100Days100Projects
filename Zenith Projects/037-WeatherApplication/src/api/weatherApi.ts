// src/api/weatherApi.ts

import axios from 'axios';

const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
const API_URL = 'https://api.openweathermap.org/data/2.5';

const getForecastData = async (city: string, days: number) => {
  try {
    const response = await axios.get(`${API_URL}/forecast`, {
      params: {
        q: city,
        units: 'metric',
        APPID: API_KEY,
        cnt: days,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Error fetching forecast data: ${error.message}`);
    } else {
      console.error('An unknown error occurred:', error);
    }

    throw error;
  }
};

export { getForecastData };