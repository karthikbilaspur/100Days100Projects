import React from 'react';
import { Link } from 'react-router-dom';

const User = ({ user }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <Link to={`/users/${user.id}`}>View Profile</Link>
    </div>
  );
};

export default User;