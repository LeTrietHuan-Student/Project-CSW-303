import React from 'react';
import { FaMoneyBill, FaShoppingCart, FaCreditCard } from 'react-icons/fa';

function Stats() {
  return (
    <div className="stats">
      <div className="stat-card">
        <FaMoneyBill style={{ color: 'rgb(76, 175, 80)' }} size={35}></FaMoneyBill>
        <h3>Total Income</h3>
        <p className="income-text">$13,650.71</p>
      </div>
      <div className="stat-card">
        <FaShoppingCart style={{ color: 'rgb(244, 67, 54)' }} size={35}></FaShoppingCart>
        <h3>Total Expenses</h3>
        <p className="expense-text">-$250.00</p>
      </div>
      <div className="stat-card">
        <FaCreditCard style={{ color: 'rgb(33, 150, 243)' }} size={35}></FaCreditCard>
        <h3>Savings</h3>
        <p className="balance-text">$13,400.71</p>
      </div>
    </div>
  );
}

export default Stats;