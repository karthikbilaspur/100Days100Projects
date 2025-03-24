import React from 'react';

const ScreenReaderSupport = () => {
  return (
    <div>
      <h2>Screen Reader Support</h2>
      <form>
        <label>Screen Reader:</label>
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

export default ScreenReaderSupport;