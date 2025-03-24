import React from 'react';
import './FinancialCalculator.css';

const FinancialCalculator = () => {
  return (
    <div className="financial-calculator">
      <h2>Financial Calculator</h2>
      <form>
        <label>Present Value:</label>
        <input type="number" />
        <br />
        <label>Interest Rate:</label>
        <input type="number" />
        <br />
        <label>Number of Periods:</label>
        <input type="number" />
        <br />
        <button>Calculate</button>
      </form>
    </div>
  );
};

export default FinancialCalculator;