import React from 'react';
import './GraphingCalculator.css';

const GraphingCalculator = () => {
  return (
    <div className="graphing-calculator">
      <h2>Graphing Calculator</h2>
      <canvas id="graph" width="400" height="400"></canvas>
    </div>
  );
};

export default GraphingCalculator;