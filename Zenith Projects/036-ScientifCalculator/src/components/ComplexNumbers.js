import React from 'react';

const ComplexNumbers = () => {
  return (
    <div>
      <h2>Complex Numbers</h2>
      <form>
        <label>Real part:</label>
        <input type="number" />
        <br />
        <label>Imaginary part:</label>
        <input type="number" />
        <br />
        <button>Add</button>
        <button>Subtract</button>
        <button>Multiply</button>
        <button>Divide</button>
      </form>
    </div>
  );
};

export default ComplexNumbers;