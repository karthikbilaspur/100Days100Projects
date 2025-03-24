import React from 'react';

const HighContrastMode = () => {
  return (
    <div>
      <h2>High Contrast Mode</h2>
      <form>
        <label>High Contrast Mode:</label>
        <select>
          <option>Enabled</option>
          <option>Disabled</option>
        </select>
        <br />
        <button>Save</button>
      </form>
    </div>
  );
};

export default HighContrastMode;