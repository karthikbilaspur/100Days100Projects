// src/components/MapView.tsx

import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

interface Props {
  cities: string[];
  weatherData: any[];
}

const MapView = ({ cities, weatherData }: Props) => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '600px' }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {cities.map((city, index) => (
        <Marker key={index} position={[51.505, -0.09]}>
          <div>
            {city}
            <br />
            Temperature: {weatherData[index].main.temp}°C
            <br />
            Humidity: {weatherData[index].main.humidity}%
          </div>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;