import React from 'react';

const CalculusOperations = () => {
  return (
    <div>
      <h2>Calculus Operations</h2>
      <form>
        <label>Function:</label>
        <input type="text" />
        <br />
        <label>Variable:</label>
        <input type="text" />
        <br />
        <button>Differentiate</button>
        <button>Integrate</button>
      </form>
    </div>
  );
};

export default CalculusOperations;