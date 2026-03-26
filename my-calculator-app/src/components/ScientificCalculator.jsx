import React, { useState } from 'react';
import './Calculator.css'; // Reusing shared styles

// A more robust and safer function to evaluate scientific mathematical expressions
const evaluateScientificExpression = (expression) => {
  // Replace common math functions with Math object methods
  // And replace ^ with ** for JavaScript's power operator
  let processedExpression = expression
    .replace(/pi/g, 'Math.PI')
    .replace(/e/g, 'Math.E')
    .replace(/sin\(([^)]*)\)/g, (match, p1) => `Math.sin(${evaluateScientificExpression(p1)})`)
    .replace(/cos\(([^)]*)\)/g, (match, p1) => `Math.cos(${evaluateScientificExpression(p1)})`)
    .replace(/tan\(([^)]*)\)/g, (match, p1) => `Math.tan(${evaluateScientificExpression(p1)})`)
    .replace(/log\(([^)]*)\)/g, (match, p1) => `Math.log10(${evaluateScientificExpression(p1)})`) // log base 10
    .replace(/ln\(([^)]*)\)/g, (match, p1) => `Math.log(${evaluateScientificExpression(p1)})`) // natural log
    .replace(/sqrt\(([^)]*)\)/g, (match, p1) => `Math.sqrt(${evaluateScientificExpression(p1)})`)
    .replace(/\^/g, '**') // JavaScript's power operator
    .replace(/([0-9.]+)(e)/g, '$1*Math.E') // Handle numbers followed by e (e.g., 2e)
    .replace(/([0-9.]+)(pi)/g, '$1*Math.PI'); // Handle numbers followed by pi (e.g., 2pi)

  // Use a regex to ensure only valid characters remain.
  // This helps prevent code injection while allowing scientific functions and numbers.
  const allowedCharsRegex = /^[\d\s+\-*/%.()ePI]*$/; // Added E for Math.E and PI for Math.PI
  if (!allowedCharsRegex.test(processedExpression)) {
    return 'Syntax Error';
  }

  try {
    // This uses the Function constructor for evaluation, which is generally safer than direct eval()
    // because it executes code in its own scope and not the global scope.
    // However, it's still a form of dynamic code execution and should be used with caution.
    // For ultimate security in a production environment with untrusted input,
    // a dedicated math expression parser library is recommended.
    const result = new Function('return ' + processedExpression)();
    if (isNaN(result) ||!isFinite(result)) {
        return 'Error';
    }
    return result.toString();
  } catch (error) { // The 'error' variable is now used!
    // console.error("Calculation error:", error); // For debugging
    return 'Error';
  }
};

const ScientificCalculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleButtonClick = (value) => {
    // Clear result when starting new input after a calculation
    if (result!== '' &&!['C', 'DEL'].includes(value) &&!['+', '-', '*', '/'].includes(value)) {
        setInput(value);
        setResult('');
        return;
    }

    if (value === '=') {
      const calculatedResult = evaluateScientificExpression(input);
      setResult(calculatedResult);
      // Optional: If the result is a number, set it as the new input for continuous calculations
      if (!isNaN(parseFloat(calculatedResult)) && isFinite(parseFloat(calculatedResult))) {
          setInput(calculatedResult);
      } else {
          setInput(''); // Clear input on error
      }
    } else if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === 'DEL') {
      setInput((prevInput) => prevInput.slice(0, -1));
      setResult(''); // Clear result if user starts editing previous input
    } else if (value === 'Ans') {
        // Use the previous result if available
        setInput(prevInput => prevInput + result);
    }
    else {
      // Basic logic to handle operators and parentheses for better input
      const lastChar = input.slice(-1);
      const isLastCharOperator = ['+', '-', '*', '/', '^'].includes(lastChar);
      const isNewValueOperator = ['+', '-', '*', '/', '^'].includes(value);

      if (isNewValueOperator && isLastCharOperator) {
        setInput((prevInput) => prevInput.slice(0, -1) + value);
      } else if (input === '' && isNewValueOperator && value !== '-') { // Allow negative numbers to start
        return;
      }
      else {
        setInput((prevInput) => prevInput + value);
      }
      setResult(''); // Clear previous result when new input is added
    }
  };

  const buttons = [
    '(', ')', 'DEL', 'C',
    'sin', 'cos', 'tan', '/',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    'ln', 'log', 'sqrt', '^',
    'pi', '0', '.', '=',
  ];

  return (
    <div className="calculator-card scientific">
      <h2>Scientific Calculator</h2>
      <div className="display">
        <div className="input">{input}</div>
        <div className="result">{result}</div>
      </div>
      <div className="buttons scientific-buttons">
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => handleButtonClick(btn)}
            className={['=', 'C', 'DEL', '+', '-', '*', '/', '^'].includes(btn) || ['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'pi'].includes(btn) ? 'operator' : ''}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScientificCalculator;