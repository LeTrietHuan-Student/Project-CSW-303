// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import ExpenseForm from './AddExpense';

import React, { useState } from 'react';
import '../styles/budget.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Stats from './Stats';
import IncomeModal from './IncomeModal';
import CircleChart from './CircleChart';
import LineChart from './LineChart';
import BarChart from './BarChart';
import BudgetContainer from './BudgetContainer';
import Transactions from './Transactions';
import Reminders from './Reminders';
import Footer from './Footer';

function Dashboard() {
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />
      <div className="mainLayout">
        <Sidebar isActive={isSidebarActive} />
        <div className="main-content">
          <Stats />
          <IncomeModal />
          <CircleChart />
          <LineChart />
          <BarChart />
          <BudgetContainer />
          <Transactions />
          <Reminders />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;


