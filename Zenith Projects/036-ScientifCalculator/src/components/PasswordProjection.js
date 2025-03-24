import React from 'react';

const PasswordProtection = () => {
  return (
    <div>
      <h2>Password Protection</h2>
      <form>
        <label>Password Protection:</label>
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

export default PasswordProtection;