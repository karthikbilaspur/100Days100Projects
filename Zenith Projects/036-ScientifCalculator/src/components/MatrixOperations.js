import React from 'react';

const MatrixOperations = () => {
  return (
    <div>
      <h2>Matrix Operations</h2>
      <form>
        <label>Matrix A:</label>
        <input type="text" />
        <br />
        <label>Matrix B:</label>
        <input type="text" />
        <br />
        <button>Add</button>
        <button>Subtract</button>
        <button>Multiply</button>
        <button>Invert</button>
      </form>
    </div>
  );
};

export default MatrixOperations;