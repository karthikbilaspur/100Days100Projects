// src/components/AirQualityIndex.tsx

import React from 'react';

interface Props {
  airQualityIndex: number;
}

const AirQualityIndex = ({ airQualityIndex }: Props) => {
  let airQualityColor = '';
  let airQualityText = '';

  if (airQualityIndex <= 50) {
    airQualityColor = 'green';
    airQualityText = 'Good';
  } else if (airQualityIndex <= 100) {
    airQualityColor = 'yellow';
    airQualityText = 'Moderate';
  } else if (airQualityIndex <= 150) {
    airQualityColor = 'orange';
    airQualityText = 'Unhealthy for sensitive groups';
  } else {
    airQualityColor = 'red';
    airQualityText = 'Unhealthy';
  }

  return (
    <div>
      <h2>Air Quality Index</h2>
      <p style={{ color: airQualityColor }}>{airQualityText}</p>
      <p>Air Quality Index: {airQualityIndex}</p>
    </div>
  );
};

export default AirQualityIndex;