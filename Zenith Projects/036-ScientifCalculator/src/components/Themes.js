import React from 'react';

const Themes = () => {
  return (
    <div>
      <h2>Themes</h2>
      <form>
        <label>Theme:</label>
        <select>
          <option>Light</option>
          <option>Dark</option>
          <option>Custom</option>
        </select>
        <br />
        <button>Save</button>
      </form>
    </div>
  );
};

export default Themes;