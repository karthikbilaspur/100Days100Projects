import React from 'react';

const ButtonShortcuts = () => {
  return (
    <div>
      <h2>Button Shortcuts</h2>
      <form>
        <label>Button:</label>
        <select>
          <option>Button 1</option>
          <option>Button 2</option>
          <option>Button 3</option>
        </select>
        <br />
        <label>Shortcut:</label>
        <input type="text" />
        <br />
        <button>Save</button>
      </form>
    </div>
  );
};

export default ButtonShortcuts;