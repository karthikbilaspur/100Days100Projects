// MapView.js
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import CityDetails from './CityDetails';

const MapView = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [mapCenter, setMapCenter] = useState([37.7749, -122.4194]);
  const [zoom, setZoom] = useState(12);



  useEffect(() => {
    const fetchCities = async () => {
      const response = await fetch('/api/cities');
      const data = await response.json();
      setCities(data);
    };
    fetchCities();
  }, []);

  useEffect(() => {
    if (selectedCity) {
      setMapCenter([selectedCity.latitude, selectedCity.longitude]);
      setZoom(15);
    }
  }, [selectedCity]);


  const handleMarkerClick = (city) => {
    setSelectedCity(city);
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={{ height: '400px', width: '800px' }}
        center={{ lat: 20.5937, lng: 78.9629 }}
        zoom={4}
      >
        {cities.map((city) => (
          <Marker
            key={city._id}
            position={{ lat: city.lat, lng: city.lng }}
            onClick={() => handleMarkerClick(city)}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};