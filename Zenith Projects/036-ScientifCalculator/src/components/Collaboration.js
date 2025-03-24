import React from 'react';

const Collaboration = () => {
  return (
    <div>
      <h2>Collaboration</h2>
      <form>
        <label>Collaboration:</label>
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

export default Collaboration;