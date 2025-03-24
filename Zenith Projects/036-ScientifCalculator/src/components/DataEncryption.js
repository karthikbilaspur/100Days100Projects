import React from 'react';

const DataEncryption = () => {
  return (
    <div>
      <h2>Data Encryption</h2>
      <form>
        <label>Data Encryption:</label>
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

export default DataEncryption;