// src/components/Dashboard.tsx

import React from 'react';
import WeatherCard from './WeatherCard';

interface Props {
  cities: string[];
}

const Dashboard = ({ cities }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cities.map((city, index) => (
        <WeatherCard key={index} city={city} />
      ))}
    </div>
  );
};

export default Dashboard;