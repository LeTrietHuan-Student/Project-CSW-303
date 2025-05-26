import axios from 'axios';
import React, { useState } from 'react';
import { FaMoneyBill, FaShoppingCart, FaCreditCard } from 'react-icons/fa';

function Stats() {
  const [totalIncome, setTotalIncome] = useState(0); // Quản lý state cho tổng thu nhập
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [savings, setSavings] = useState(0);
  const handleSubmit = async (e) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found. Please log in.');
      }
      // get data icome
      const res1 = await axios.post(
        'http://localhost:500/api/auth/incomeData',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // get data expense
      const res2 = await axios.post(
        'http://localhost:500/api/auth/expensesData',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const total1 = res1.data.incomes.reduce((total, item) => total + item.value, 0);
      const total2 = res2.data.expenses.reduce((total, item) => total + item.value, 0);
      setTotalIncome(total1); 
      setTotalExpenses(total2); 
      setSavings(total1-total2);
      
    } catch (err) {
      console.error('Error:', err);
    }
  }
  handleSubmit();
  
  


  return (
    <div className="stats">
      <div className="stat-card">
        <FaMoneyBill style={{ color: 'rgb(76, 175, 80)' }} size={35}></FaMoneyBill>
        <h3>Total Income</h3>
        <p className="income-text">${totalIncome}</p>
      </div>
      <div className="stat-card">
        <FaShoppingCart style={{ color: 'rgb(244, 67, 54)' }} size={35}></FaShoppingCart>
        <h3>Total Expenses</h3>
        <p className="expense-text">-${totalExpenses}</p>
      </div>
      <div className="stat-card">
        <FaCreditCard style={{ color: 'rgb(33, 150, 243)' }} size={35}></FaCreditCard>
        <h3>Savings</h3>
        <p className="balance-text">{savings < 0 ? `-$${Math.abs(savings)}` : `$${savings}`}</p>
      </div>
    </div>
  );
}

export default Stats;