import React, { useState, useEffect } from 'react';
import CityCard from '../components/CityCard';

const CityList = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('/api/cities');
        const data = await response.json();
        setCities(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCities();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        cities.map((city) => <CityCard key={city._id} city={city} />)
      )}
    </div>
  );
};

export default CityList;