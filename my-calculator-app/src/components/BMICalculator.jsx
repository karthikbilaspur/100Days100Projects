import React, { useState, useEffect } from 'react';
import './Calculator.css'; // Reusing shared styles

const BMICalculator = () => {
  const [height, setHeight] = useState(''); // in cm
  const [weight, setWeight] = useState(''); // in kg
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');

  useEffect(() => {
    const calculateBMI = () => {
      const h = parseFloat(height);
      const w = parseFloat(weight);

      if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
        setBmi(null);
        setBmiCategory('');
        return;
      }

      // BMI Formula: weight (kg) / (height (m))^2
      const heightInMeters = h / 100;
      const calculatedBmi = w / (heightInMeters * heightInMeters);
      setBmi(calculatedBmi.toFixed(2));

      if (calculatedBmi < 18.5) {
        setBmiCategory('Underweight');
      } else if (calculatedBmi >= 18.5 && calculatedBmi <= 24.9) {
        setBmiCategory('Normal weight');
      } else if (calculatedBmi >= 25 && calculatedBmi <= 29.9) {
        setBmiCategory('Overweight');
      } else {
        setBmiCategory('Obesity');
      }
    };

    calculateBMI();
  }, [height, weight]);

  return (
    <div className="calculator-card bmi-calculator">
      <h2>BMI Calculator</h2>

      <div className="form-group">
        <label>Height (cm):</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="e.g., 175"
          min="0"
        />
      </div>

      <div className="form-group">
        <label>Weight (kg):</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="e.g., 70"
          min="0"
        />
      </div>

      {bmi && (
        <div className="results-section">
          <p>Your BMI: <span>{bmi}</span></p>
          <p>Category: <span className={`bmi-category ${bmiCategory.replace(/\s+/g, '-').toLowerCase()}`}>{bmiCategory}</span></p>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;