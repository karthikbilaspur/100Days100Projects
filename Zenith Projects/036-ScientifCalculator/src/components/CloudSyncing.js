import React from 'react';

const CloudSyncing = () => {
  return (
    <div>
      <h2>Cloud Syncing</h2>
      <form>
        <label>Cloud Syncing:</label>
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

export default CloudSyncing;