import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Calculator</a></li>
        <li><a href="#">History</a></li>
        <li><a href="#">Unit Converter</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;