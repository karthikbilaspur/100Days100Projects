import React from 'react';
import './History.css';

const History = ({ history }) => {
  return (
    <div className="history">
      <h2>Calculation History</h2>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </div>
  );
};

export default History;