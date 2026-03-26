import React, { useState } from 'react';
import BasicCalculator from './components/BasicCalculator';
import ScientificCalculator from './components/ScientificCalculator';
import UnitConverter from './components/UnitConverter';
import TipCalculator from './components/TipCalculator';
import BMIcalculator from './components/BMICalculator'; // Typo fixed: BMIcalculator -> BMICalculator
import './App.css'; // Assuming you have some basic styling

const App = () => {
  const [activeCalculator, setActiveCalculator] = useState('basic');

  const renderCalculator = () => {
    switch (activeCalculator) {
      case 'basic':
        return <BasicCalculator />;
      case 'scientific':
        return <ScientificCalculator />;
      case 'unitConverter':
        return <UnitConverter />;
      case 'tipCalculator':
        return <TipCalculator />;
      case 'bmiCalculator':
        return <BMIcalculator />;
      default:
        return <BasicCalculator />;
    }
  };

  return (
    <div className="app-container">
      <h1>My Awesome Calculator Suite</h1>
      <nav className="calculator-nav">
        <button onClick={() => setActiveCalculator('basic')} className={activeCalculator === 'basic' ? 'active' : ''}>Basic</button>
        <button onClick={() => setActiveCalculator('scientific')} className={activeCalculator === 'scientific' ? 'active' : ''}>Scientific</button>
        <button onClick={() => setActiveCalculator('unitConverter')} className={activeCalculator === 'unitConverter' ? 'active' : ''}>Unit Converter</button>
        <button onClick={() => setActiveCalculator('tipCalculator')} className={activeCalculator === 'tipCalculator' ? 'active' : ''}>Tip Calculator</button>
        <button onClick={() => setActiveCalculator('bmiCalculator')} className={activeCalculator === 'bmiCalculator' ? 'active' : ''}>BMI Calculator</button>
      </nav>
      <div className="calculator-display">
        {renderCalculator()}
      </div>
    </div>
  );
};

export default App;