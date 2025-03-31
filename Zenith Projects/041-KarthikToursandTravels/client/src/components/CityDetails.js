import React from 'react';
import ImageGallery from './ImageGallery';
import Reviews from './Reviews';
import Ratings from './Ratings';
import WeatherForecast from './WeatherForecast';
import EventsCalendar from './EventsCalendar';
import SocialSharing from './SocialSharing';

const CityDetails = ({ city }) => {
  return (
    <div>
      <h2>{city.name}</h2>
      <p>{city.state}</p>
      <p>{city.history}</p>
      <ul>
        {city.placesToVisit.map((place, index) => (
          <li key={index}>{place}</li>
        ))}
      </ul>
      <ImageGallery images={city.images} />
      <Reviews reviews={city.reviews} />
      <Ratings ratings={city.ratings} />
      <WeatherForecast weather={city.weather} />
      <EventsCalendar events={city.events} />
      <SocialSharing />
    </div>
  );
};

export default CityDetails
