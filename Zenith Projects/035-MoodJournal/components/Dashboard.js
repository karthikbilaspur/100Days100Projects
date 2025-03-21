import React from 'react';

const Dashboard = ({ data, handleUpdateDashboardData }) => {
  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        {Object.keys(data).map((key) => (
          <li key={key}>{key}: {data[key]}</li>
        ))}
      </ul>
      <button onClick={handleUpdateDashboardData}>Update Dashboard Data</button>
    </div>
  );
};

export default Dashboard;