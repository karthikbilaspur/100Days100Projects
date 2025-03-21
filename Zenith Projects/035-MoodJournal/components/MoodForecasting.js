import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MoodForecasting() {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    axios.get('/api/forecast')
      .then((response) => {
        setForecast(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h2>Mood Forecast</h2>
      {forecast && (
        <p>Based on your past entries, your mood is likely to be {forecast.mood} tomorrow.</p>
      )}
    </div>
  );
}

export default MoodForecasting;