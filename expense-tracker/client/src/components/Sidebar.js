import {React, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChartLine, FaFileAlt, FaCogs, FaEye } from 'react-icons/fa';

function Sidebar({ isActive }) {
  const handleScrollToTop = () => {
    window.scrollTo(0, 0); // Cuộn lên đầu trang
  };
  return (
    <div className={`sidebar ${isActive ? 'active' : ''}`}>
      <h2>Dashboard</h2>
      <Link to="/" className="btn">
        Get Started
      </Link>
      <ul>
        <li>
          <Link to="/dashboard" onClick={handleScrollToTop}>
            <FaChartLine />&nbsp;&nbsp;&nbsp;Analytics
          </Link>
        </li>
        <li>
          <Link to="/reports" onClick={handleScrollToTop}>
            <FaFileAlt />&nbsp;&nbsp;&nbsp;Reports
          </Link>
        </li>
        <li>
          <Link to="/settings" onClick={handleScrollToTop}>
            <FaCogs />&nbsp;&nbsp;&nbsp;Settings
          </Link>
        </li>
        <li>
          <Link to="/overview" onClick={handleScrollToTop}>
            <FaEye />&nbsp;&nbsp;&nbsp;Overview
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
