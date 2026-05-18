import React, { useState } from 'react';
import './Calculator.css'; // Reusing shared styles

const UnitConverter = () => {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('feet');
  const [category, setCategory] = useState('length');
  const [convertedValue, setConvertedValue] = useState('');

  const conversionRates = {
    length: {
      meters: { feet: 3.28084, inches: 39.3701, kilometers: 0.001, miles: 0.000621371 },
      feet: { meters: 0.3048, inches: 12, kilometers: 0.0003048, miles: 0.000189394 },
      //... add other length units
    },
    weight: {
      kilograms: { pounds: 2.20462, grams: 1000, ounces: 35.274 },
      pounds: { kilograms: 0.453592, grams: 453.592, ounces: 16 },
      //... add other weight units
    },
    temperature: {
      celsius: {
        fahrenheit: (c) => (c * 9 / 5) + 32,
        kelvin: (c) => c + 273.15,
      },
      fahrenheit: {
        celsius: (f) => (f - 32) * 5 / 9,
        kelvin: (f) => (f - 32) * 5 / 9 + 273.15,
      },
      kelvin: {
        celsius: (k) => k - 273.15,
        fahrenheit: (k) => (k - 273.15) * 9 / 5 + 32,
      }
    }
  };

  const getUnitsForCategory = (cat) => {
    return Object.keys(conversionRates[cat]);
  };

  const handleConversion = () => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) ||!fromUnit ||!toUnit ||!category) {
      setConvertedValue('Invalid Input');
      return;
    }

    if (fromUnit === toUnit) {
      setConvertedValue(numValue.toString());
      return;
    }

    if (category === 'temperature') {
      const convertFunc = conversionRates.temperature[fromUnit][toUnit];
      if (typeof convertFunc === 'function') {
        setConvertedValue(convertFunc(numValue).toFixed(2));
      } else {
        setConvertedValue('Conversion not supported');
      }
    } else {
      const rate = conversionRates[category][fromUnit][toUnit];
      if (rate) {
        setConvertedValue((numValue * rate).toFixed(4));
      } else {
        // If direct conversion not found, try indirect (e.g., A to B, B to C, so A to C)
        // For simplicity, this example only handles direct.
        setConvertedValue('Conversion not supported');
      }
    }
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    const newUnits = getUnitsForCategory(newCategory);
    setFromUnit(newUnits[0]);
    setToUnit(newUnits[1] || newUnits[0]); // Ensure there's a 'to' unit
    setValue('');
    setConvertedValue('');
  };

  return (
    <div className="calculator-card unit-converter">
      <h2>Unit Converter</h2>
      <div className="form-group">
        <label>Category:</label>
        <select value={category} onChange={handleCategoryChange}>
          {Object.keys(conversionRates).map((cat) => (
            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Value:</label>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
        />
      </div>

      <div className="form-group">
        <label>From:</label>
        <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
          {getUnitsForCategory(category).map((unit) => (
            <option key={unit} value={unit}>{unit.charAt(0).toUpperCase() + unit.slice(1)}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>To:</label>
        <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
          {getUnitsForCategory(category).map((unit) => (
            <option key={unit} value={unit}>{unit.charAt(0).toUpperCase() + unit.slice(1)}</option>
          ))}
        </select>
      </div>

      <button onClick={handleConversion} className="convert-button">Convert</button>

      {convertedValue && (
        <div className="result-display">
          Result: <strong>{convertedValue}</strong> {toUnit}
        </div>
      )}
    </div>
  );
};

export default UnitConverter;