import React from 'react';

const EventsCalendar = ({ events }) => {
  return (
    <div>
      <h2>Events Calendar:</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>{event.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default EventsCalendar;