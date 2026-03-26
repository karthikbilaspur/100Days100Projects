import React, { useState } from 'react';
import './Calculator.css'; // Assuming you'll add some CSS for calculators

// A safer function to evaluate mathematical expressions
const evaluateExpression = (expression) => {
  // Remove any characters that are not numbers, operators, or decimal points
  const safeExpression = expression.replace(/[^0-9+\-*/.]/g, '');

  try {
    // This is a basic implementation. For more complex expressions
    // with order of operations (PEMDAS/BODMAS) and parentheses,
    // you'd need a more robust parsing algorithm (e.g., Shunting-yard algorithm)
    // or a dedicated math evaluation library.

    // For this basic calculator, we'll process operations sequentially
    // after splitting the expression into numbers and operators.
    const tokens = safeExpression.match(/(\d+\.?\d*)|([+\-*/])/g);

    if (!tokens || tokens.length === 0) {
      return '';
    }

    let currentResult = parseFloat(tokens[0]);
    for (let i = 1; i < tokens.length; i += 2) {
      const operator = tokens[i];
      const nextNumber = parseFloat(tokens[i + 1]);

      if (isNaN(currentResult) || isNaN(nextNumber)) {
        return 'Error';
      }

      switch (operator) {
        case '+':
          currentResult += nextNumber;
          break;
        case '-':
          currentResult -= nextNumber;
          break;
        case '*':
          currentResult *= nextNumber;
          break;
        case '/':
          if (nextNumber === 0) return 'Division by zero';
          currentResult /= nextNumber;
          break;
        default:
          return 'Error';
      }
    }
    return currentResult.toString();
  } catch (e) {
    return 'Error';
  }
};

const BasicCalculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleButtonClick = (value) => {
    if (value === '=') {
      const calculatedResult = evaluateExpression(input);
      setResult(calculatedResult);
      // Optional: Set the input to the result for continuous calculations
      // setInput(calculatedResult === 'Error' || calculatedResult === 'Division by zero'? '' : calculatedResult);
    } else if (value === 'C') {
      setInput('');
      setResult('');
    } else {
      // Prevent adding multiple operators consecutively (e.g., "5++2")
      // and ensure a number precedes an operator
      const lastChar = input.slice(-1);
      const isLastCharOperator = ['+', '-', '*', '/'].includes(lastChar);
      const isNewValueOperator = ['+', '-', '*', '/'].includes(value);

      if (isNewValueOperator && isLastCharOperator) {
        // Replace the last operator with the new one
        setInput((prevInput) => prevInput.slice(0, -1) + value);
      } else if (isNewValueOperator && input === '') {
        // Don't start with an operator (unless it's a negative sign, which this simple parser doesn't fully handle yet)
        return;
      }
      else {
        setInput((prevInput) => prevInput + value);
      }
    }
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C'
  ];

  return (
    <div className="calculator-card">
      <h2>Basic Calculator</h2>
      <div className="display">
        <div className="input">{input}</div>
        <div className="result">{result}</div>
      </div>
      <div className="buttons">
        {buttons.map((btn) => (
          <button key={btn} onClick={() => handleButtonClick(btn)}
            className={['/', '*', '-', '+', '='].includes(btn)? 'operator' : ''} // Add operator class for styling
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BasicCalculator;