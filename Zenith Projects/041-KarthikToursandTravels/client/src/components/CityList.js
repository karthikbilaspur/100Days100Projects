import React, { useState, useEffect } from 'react';
import CityCard from './CityCard';

const CityList = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('name');
  const [pageNumber, setPageNumber] = useState(1);
  const [citiesPerPage, setCitiesPerPage] = useState(10);


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

  const handleFilter = (event) => {
    const filterValue = event.target.value.toLowerCase();
    setFilter(filterValue);
  };

  const handleSort = (event) => {
    setSort(event.target.value);
  };

const filteredCities = cities.filter((city) =>
  city.name.toLowerCase().includes(filter)
); 

const sortedCities = filteredCities.sort((a, b) =>
  a[sort].localeCompare(b[sort])
);


const indexOfLastCity = pageNumber * citiesPerPage;
const indexOfFirstCity = indexOfLastCity - citiesPerPage;
const currentCities = sortedCities.slice(indexOfFirstCity, indexOfLastCity);
const paginate = (pageNumber) => setPageNumber(pageNumber);


  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <input type="text" value={filter} onChange={handleFilter} placeholder="Filter by city name..." />
          <select value={sort} onChange={handleSort}>
            <option value="name">Name</option>
            <option value="state">State</option>
          </select>
          {sortedCities.map((city) => <CityCard key={city._id} city={city} />)}
      )}
      <Pagination
            citiesPerPage={citiesPerPage}
            totalCities={sortedCities.length}
            paginate={paginate}
          />
          {currentCities.map((city) => (
            <CityCard key={city._id} city={city} />
          ))}
        </div>
      )}
      </div>
  );
};

export default CityList;