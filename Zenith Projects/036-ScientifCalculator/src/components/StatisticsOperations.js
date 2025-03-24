import React from 'react';

const StatisticsOperations = () => {
  return (
    <div>
      <h2>Statistics Operations</h2>
      <form>
        <label>Data:</label>
        <input type="text" />
        <br />
        <button>Mean</button>
        <button>Median</button>
        <button>Mode</button>
        <button>Standard Deviation</button>
      </form>
    </div>
  );
};

export default StatisticsOperations;