

import React, { useState } from 'react';
import './AdminNavbar.css';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggleButton from './ThemeToggleButton'; // Import the button

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
    window.location.reload();
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        Justice<span>Assist</span>
      </div>

      <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/users">Users</Link>
        <Link to="/admin/settings">Settings</Link>
        <ThemeToggleButton /> {/* Add the button here */}
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <div className={`bar ${isOpen ? 'rotate1' : ''}`}></div>
        <div className={`bar ${isOpen ? 'fade' : ''}`}></div>
        <div className={`bar ${isOpen ? 'rotate2' : ''}`}></div>
      </div>
    </nav>
  );
};

export default AdminNavbar;