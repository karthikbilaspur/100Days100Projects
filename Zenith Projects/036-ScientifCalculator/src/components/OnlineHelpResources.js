import React from 'react';

const OnlineHelpResources = () => {
  return (
    <div>
      <h2>Online Help Resources</h2>
      <form>
        <label>Online Help Resources:</label>
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

export default OnlineHelpResources;