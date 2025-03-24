import React, { useState } from 'react';
import './UnitConverter.css';

const UnitConverter = () => {
  const [unitType, setUnitType] = useState('');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');

  const handleUnitTypeChange = (e) => {
    setUnitType(e.target.value);
  };

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  const handleConvert = () => {
    if (unitType === 'length') {
      const conversionRate = 3.2808; // 1 meter = 3.2808 feet
      const convertedValue = value * conversionRate;
      setResult(`${value} meters is equal to ${convertedValue} feet`);
    } else if (unitType === 'weight') {
      const conversionRate = 2.20462; // 1 kilogram = 2.20462 pounds
      const convertedValue = value * conversionRate;
      setResult(`${value} kilograms is equal to ${convertedValue} pounds`);
    } else if (unitType === 'temperature') {
      const conversionRate = 9/5; // 1 degree Celsius = 9/5 degrees Fahrenheit
      const convertedValue = (value * conversionRate) + 32;
      setResult(`${value} degrees Celsius is equal to ${convertedValue} degrees Fahrenheit`);
    }
  };

  return (
    <div className="unit-converter">
      <h2>Unit Conversion</h2>
      <select value={unitType} onChange={handleUnitTypeChange}>
        <option value="">Select Unit Type</option>
        <option value="length">Length</option>
        <option value="weight">Weight</option>
        <option value="temperature">Temperature</option>
      </select>
      <input type="number" value={value} onChange={handleValueChange} placeholder="Enter value" />
      <button onClick={handleConvert}>Convert</button>
      <p>Result: {result}</p>
    </div>
  );
};

export default UnitConverter;