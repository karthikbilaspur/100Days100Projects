import React from 'react';

const VectorOperations = () => {
  return (
    <div>
      <h2>Vector Operations</h2>
      <form>
        <label>Vector A:</label>
        <input type="text" />
        <br />
        <label>Vector B:</label>
        <input type="text" />
        <br />
        <button>Add</button>
        <button>Subtract</button>
        <button>Scalar Multiply</button>
        <button>Dot Product</button>
      </form>
    </div>
  );
};

export default VectorOperations;