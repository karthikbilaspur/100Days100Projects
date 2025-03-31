import React from 'react';

const CityCard = ({ city }) => {
  return (
    <div>
      <h2>{city.name}</h2>
      <p>{city.state}</p>
      <button>View Details</button>
    </div>
  );
};

export default CityCard;