// src/components/Transactions.jsx
import React, { useState, useRef, useEffect } from "react";
import { FaBeer, FaFilm, FaUtensils, FaShoppingCart, FaGasPump } from "react-icons/fa";
import { getTransactions, addTransaction } from "../javascripts/transactionData";

function Transactions() {
  const [transactions, setTransactions] = useState(getTransactions());
  const [newTransaction, setNewTransaction] = useState({
    category: "",
    icon: "FaBeer",
    paymentMethod: "WALLET",
    amount: "",
    date: "",
  });
  const [expandedRow, setExpandedRow] = useState(null);
  const [checkedRows, setCheckedRows] = useState(new Set());
  const tableRef = useRef(null);

  // Update transactions when external changes occur
  useEffect(() => {
    setTransactions(getTransactions());
  }, []);

  // Handle outside clicks to close detail rows
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tableRef.current && !tableRef.current.contains(event.target)) {
        setExpandedRow(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Handle row click to toggle details
  const handleRowClick = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // Handle check/uncheck
  const handleCheckToggle = (id) => {
    const newCheckedRows = new Set(checkedRows);
    if (checkedRows.has(id)) {
      newCheckedRows.delete(id);
    } else {
      newCheckedRows.add(id);
    }
    setCheckedRows(newCheckedRows);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      newTransaction.category &&
      newTransaction.amount &&
      newTransaction.date &&
      newTransaction.icon &&
      newTransaction.paymentMethod
    ) {
      const amount = parseFloat(newTransaction.amount);
      if (!isNaN(amount)) {
        addTransaction({
          category: newTransaction.category,
          icon: newTransaction.icon,
          paymentMethod: newTransaction.paymentMethod,
          amount: -Math.abs(amount), // Ensure negative for expenses
          date: newTransaction.date,
        });
        setTransactions([...getTransactions()]);
        setNewTransaction({
          category: "",
          icon: "FaBeer",
          paymentMethod: "WALLET",
          amount: "",
          date: "",
        });
      }
    }
  };

  // Icon mapping
  const iconMap = {
    FaBeer: <FaBeer size={20}/>,
    FaFilm: <FaFilm size={20}/>,
    FaUtensils: <FaUtensils size={20}/>,
    FaShoppingCart: <FaShoppingCart size={20}/>,
    FaGasPump: <FaGasPump size={20}/>,
  };

  return (
    <div className="transactions-section">
      <h2>Transactions</h2>
      <table id="transactions-table" ref={tableRef}>
        <thead>
          <tr>
            <th>Category</th>
            <th>Payment Method</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <React.Fragment key={t.id}>
              <tr
                className={`transaction-row ${checkedRows.has(t.id) ? "checked-row" : ""}`}
                onClick={() => handleRowClick(t.id)}
              >
                <td>
                  <span className="tag-icon">{iconMap[t.icon]}</span>
                  &nbsp;&nbsp;&nbsp;{t.category}
                </td>
                <td>{t.paymentMethod}</td>
                <td className="expense-text">${t.amount.toFixed(2)}</td>
                <td>{t.date}</td>
              </tr>
              {expandedRow === t.id && (
                <tr className="detail-row">
                  <td colSpan="4">
                    <div className="detail-content">
                      <p><strong>Category:</strong> {t.category}</p>
                      <p><strong>Payment Method:</strong> {t.paymentMethod}</p>
                      <p><strong>Amount:</strong> ${t.amount.toFixed(2)}</p>
                      <p><strong>Date:</strong> {t.date}</p>
                      <button
                        className="check-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCheckToggle(t.id);
                        }}
                      >
                        {checkedRows.has(t.id) ? "UNCHECKED" : "CHECKED"}
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;