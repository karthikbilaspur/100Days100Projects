import React from 'react';

const CustomizableLayout = () => {
  return (
    <div>
      <h2>Customizable Layout</h2>
      <form>
        <label>Button layout:</label>
        <select>
          <option>Standard</option>
          <option>Scientific</option>
          <option>Custom</option>
        </select>
        <br />
        <button>Save</button>
      </form>
    </div>
  );
};

export default CustomizableLayout;