import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaCog, FaFileUpload, FaMoon, FaSun, FaSignInAlt } from 'react-icons/fa';

const Sidebar = ({ isDarkMode, toggleTheme }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>RFPilot 🚀</h3>
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/"><FaHome /> Dashboard</Link>
        </li>
        <li>
          <Link to="/upload"><FaFileUpload /> Upload RFP</Link>
        </li>
        <li>
          <Link to="/settings"><FaCog /> Settings</Link>
        </li>
      </ul>
      <div className="sidebar-footer">
        <div className="theme-toggle" onClick={toggleTheme}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
          <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </div>
        <div className="signin-link">
          <Link to="/signin"><FaSignInAlt /> Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;