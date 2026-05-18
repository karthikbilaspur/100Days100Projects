import React, { useState, useEffect } from 'react';
import './Calculator.css'; // Reusing shared styles

const TipCalculator = () => {
  const [billAmount, setBillAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState(15);
  const [numPeople, setNumPeople] = useState(1);
  const [tipAmount, setTipAmount] = useState(0);
  const [totalBill, setTotalBill] = useState(0);
  const [amountPerPerson, setAmountPerPerson] = useState(0);

  useEffect(() => {
    const calculateTip = () => {
      const bill = parseFloat(billAmount);
      if (isNaN(bill) || bill <= 0) {
        setTipAmount(0);
        setTotalBill(0);
        setAmountPerPerson(0);
        return;
      }

      const tip = bill * (tipPercentage / 100);
      const total = bill + tip;
      const perPerson = total / numPeople;

      setTipAmount(tip.toFixed(2));
      setTotalBill(total.toFixed(2));
      setAmountPerPerson(perPerson.toFixed(2));
    };

    calculateTip();
  }, [billAmount, tipPercentage, numPeople]);

  return (
    <div className="calculator-card tip-calculator">
      <h2>Tip Calculator</h2>

      <div className="form-group">
        <label>Bill Amount ($):</label>
        <input
          type="number"
          value={billAmount}
          onChange={(e) => setBillAmount(e.target.value)}
          placeholder="e.g., 50.00"
          min="0"
          step="0.01"
        />
      </div>

      <div className="form-group">
        <label>Tip Percentage (%):</label>
        <input
          type="range"
          min="0"
          max="30"
          value={tipPercentage}
          onChange={(e) => setTipPercentage(parseInt(e.target.value))}
        />
        <span>{tipPercentage}%</span>
      </div>

      <div className="form-group">
        <label>Number of People:</label>
        <input
          type="number"
          value={numPeople}
          onChange={(e) => setNumPeople(Math.max(1, parseInt(e.target.value)))}
          min="1"
        />
      </div>

      <div className="results-section">
        <p>Tip Amount: <span>${tipAmount}</span></p>
        <p>Total Bill: <span>${totalBill}</span></p>
        <p>Amount per Person: <span>${amountPerPerson}</span></p>
      </div>
    </div>
  );
};

export default TipCalculator;