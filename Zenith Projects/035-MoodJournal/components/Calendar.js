import React from 'react';

const Calendar = ({ entries }) => {
  return (
    <div>
      <h2>Calendar</h2>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>{entry.date}</li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;