import React, { useState } from 'react';
import expenseTable from '../images/expenseTable.png';
import { getExpenseData, getAvailableMonths } from '../javascripts/circleData';

function CircleChart() {
  const [currentMonth, setCurrentMonth] = useState('thang-nay');
  const data = getExpenseData(currentMonth);

  // Generate conic gradient for the pie chart
  const generateGradient = () => {
    let gradient = '';
    let accumulatedPercentage = 0;
    data.categories.forEach((category, index) => {
      const percentage = parseFloat(category.percentage);
      gradient += `${category.color} ${accumulatedPercentage}% ${accumulatedPercentage + percentage}%`;
      accumulatedPercentage += percentage;
      if (index < data.categories.length - 1) {
        gradient += ', ';
      }
    });
    return `conic-gradient(${gradient})`;
  };

  return (
    <div className="chart-placeholder">
      <img src={expenseTable} alt="Expense Table" />
      <div className="container">
        {/* Pie Chart */}
        <div className="chart" id="chart" style={{ background: generateGradient() }}>
          <div className="total" id="total-expense">
            {data.total}
          </div>
        </div>
        <div className="stat-card">
          {/* Title and Month Selector */}
          <table id="expense-table-title">
            <tbody>
              <tr>
                <td>
                  <h2>CHI TIÊU</h2>
                </td>
                <td>
                  <select
                    className="month-selector"
                    value={currentMonth}
                    onChange={(e) => setCurrentMonth(e.target.value)}
                  >
                    {getAvailableMonths().map((month) => (
                      <option key={month} value={month}>
                        {month === 'thang-nay' ? 'Tháng Này' : 'Tháng Trước'}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          {/* Expense Table */}
          <table id="expense-table">
            <tbody>
              <tr>
                <th>DANH MỤC</th>
                <th>CHI TIÊU</th>
              </tr>
              {data.categories.map((category, index) => (
                <tr key={index}>
                  <td>
                    <span
                      className="tag-color"
                      style={{ backgroundColor: category.color }}
                    ></span>
                    {category.name}
                  </td>
                  <td>
                    {category.amount} ({category.percentage})
                  </td>
                </tr>
              ))}
              <tr>
                <td><strong>TỔNG</strong></td>
                <td><strong>{data.total} (100.00%)</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CircleChart;