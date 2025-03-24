import React from 'react';
import Calculator from '../components/Calculator';
import History from '../components/History';
import './CalculatorContainer.css';

const CalculatorContainer = () => {
  return (
    <div className="calculator-container">
      <Calculator />
      <History />
    </div>
  );
};

export default CalculatorContainer;