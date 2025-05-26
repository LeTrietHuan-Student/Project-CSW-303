import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faDollarSign, faUniversity, faCheckCircle, faCalendar, faClock, faUser, faPencil, faTimes, faInfoCircle, faSync, faStar, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import '../styles/budget.css';
import { useNavigate } from 'react-router-dom';

function AddExpense() {
  const [isOpen, setIsOpen] = useState(true); // Modal is open by default on this route
  const navigate = useNavigate();

  const closeModal = () => {
    setIsOpen(false);
    navigate('/dashboard'); // Navigate back to dashboard on close
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle expense form submission (similar to input.js logic)
    console.log('Expense submitted');
    navigate('/dashboard'); // Navigate to dashboard after saving
  };

  return (
    <div id="expense-modal" className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>NEW EXPENSE</h2>
          <div className="modal-icons">
            <FontAwesomeIcon icon={faInfoCircle} />
            <FontAwesomeIcon icon={faSync} />
            <FontAwesomeIcon icon={faStar} />
          </div>
          <span className="close" onClick={closeModal}>
            ×
          </span>
        </div>
        <form id="expense-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="category">
              <FontAwesomeIcon icon={faCircle} style={{ color: '#ccc' }} /> Category
            </label>
            <select id="category" name="category" required>
              <option value="">Select category</option>
              <option value="food">Food</option>
              <option value="transport">Transport</option>
              <option value="entertainment">Entertainment</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="value">
              <FontAwesomeIcon icon={faDollarSign} /> Value
            </label>
            <input type="number" id="value" name="value" step="0.01" required />
            <span id="total">Total: $0.00</span>
          </div>
          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faCircle} style={{ color: '#ccc' }} /> Is a refund?
            </label>
            <div className="toggle">
              <input type="checkbox" id="refund" name="refund" />
              <label htmlFor="refund" className="toggle-label refund-toggle"></label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="account">
              <FontAwesomeIcon icon={faUniversity} /> Account
            </label>
            <select id="account" name="account" required>
              <option value="wallet">Wallet</option>
              <option value="bank">Bank</option>
              <option value="credit-card">Credit Card</option>
            </select>
          </div>
          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#2196F3' }} /> Checked
            </label>
            <div className="toggle">
              <input type="checkbox" id="checked" defaultChecked />
              <label className="toggle-label checked-toggle" htmlFor="checked"></label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="date">
              <FontAwesomeIcon icon={faCalendar} /> Date
            </label>
            <input type="date" id="date" name="date" defaultValue="2025-04-28" required />
          </div>
          <div className="form-group">
            <label htmlFor="time">
              <FontAwesomeIcon icon={faClock} /> Time
            </label>
            <input type="time" id="time" name="time" defaultValue="21:31" required />
          </div>
          <div className="form-group">
            <label htmlFor="from">
              <FontAwesomeIcon icon={faUser} /> Payee (Optional)
            </label>
            <input type="text" id="from" name="from" />
            <FontAwesomeIcon
              icon={faTimes}
              onClick={() => (document.getElementById('from').value = '')}
            />
          </div>
          <div className="form-group">
            <label htmlFor="notes">
              <FontAwesomeIcon icon={faPencil} /> Notes (Optional)
            </label>
            <textarea id="notes" name="notes"></textarea>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
          <a href="#" className="photo-link">
            PHOTO (DROPBOX REQUIRED)
          </a>
          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={closeModal}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save
            </button>
            <button type="submit" className="save-add-btn">
              Save +
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddExpense;