import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';  // Assuming you already have this

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? 'active-link' : undefined)}
      >
        Home
      </NavLink>
      <NavLink
        to="/employees"
        className={({ isActive }) => (isActive ? 'active-link' : undefined)}
      >
        Employees
      </NavLink>
    </nav>
  );
}

export default Navbar;
