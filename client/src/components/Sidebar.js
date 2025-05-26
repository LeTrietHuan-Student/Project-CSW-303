import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartLine, FaFileAlt, FaCogs, FaEye } from 'react-icons/fa';

function Sidebar({ isActive }) {
  return (
    <div className={`sidebar ${isActive ? 'active' : ''}`}>
      <h2>Dashboard</h2>
      <Link to="/" className="btn">
        Get Started
      </Link>
      <ul>
        <li>
          <Link to="/analytics">
            <FaChartLine />&nbsp;&nbsp;&nbsp;Analytics
          </Link>
        </li>
        <li>
          <Link to="/reports">
            <FaFileAlt />&nbsp;&nbsp;&nbsp;Reports
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <FaCogs />&nbsp;&nbsp;&nbsp;Settings
          </Link>
        </li>
        <li>
          <Link to="/overview">
            <FaEye />&nbsp;&nbsp;&nbsp;Overview
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
