import React from 'react';

const KeyboardOnlyNavigation = () => {
  return (
    <div>
      <h2>Keyboard Only Navigation</h2>
      <form>
        <label>Keyboard Only Navigation:</label>
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

export default KeyboardOnlyNavigation;