import React, { useState } from 'react';
import {
  FaCircle,
  FaDollarSign,
  FaUniversity,
  FaCheckCircle,
  FaCalendar,
  FaClock,
  FaUser,
  FaPencilAlt,
  FaTimes,
  FaInfoCircle,
  FaSync,
  FaStar,
  FaChevronDown,
} from 'react-icons/fa';

function IncomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (from input.js)
    console.log('Form submitted');
    closeModal();
  };

  return (
    <>
      <button id="add-income-btn" onClick={openModal}>
        Add Income
      </button>
      <div id="income-modal" className={`modal ${isOpen ? 'open' : ''}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h2>NEW INCOME</h2>
            <div className="modal-icons">
              <FaInfoCircle></FaInfoCircle>
              <FaSync></FaSync>
              <FaStar></FaStar>
            </div>
            <span className="close" onClick={closeModal}>
              ×
            </span>
          </div>
          <form id="income-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="category">
                <FaCircle style={{ color: '#ccc' }}></FaCircle>&nbsp;&nbsp;&nbsp;Category
              </label>
              <select id="category" name="category" required>
                <option value="">Select category</option>
                <option value="salary">Salary</option>
                <option value="investments">Investments</option>
                <option value="freelance">Freelance</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="value">
                <FaDollarSign></FaDollarSign>&nbsp;&nbsp;&nbsp;Value
              </label>
              <input type="number" id="value" name="value" step="0.01" required />
              <span id="total">Total: $0.00</span>
            </div>
            <div className="form-group">
              <label>
                <FaCircle style={{ color: '#ccc' }}></FaCircle>&nbsp;&nbsp;&nbsp;Is a refund?
              </label>
              <div className="toggle">
                <input type="checkbox" id="refund" name="refund" />
                <label htmlFor="refund" className="toggle-label refund-toggle"></label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="account">
                <FaUniversity></FaUniversity>&nbsp;&nbsp;&nbsp;Account
              </label>
              <select id="account" name="account" required>
                <option value="wallet">Wallet</option>
                <option value="bank">Bank</option>
                <option value="savings">Savings</option>
              </select>
            </div>
            <div className="form-group">
              <label>
                <FaCheckCircle style={{ color: '#2196F3' }} ></FaCheckCircle>&nbsp;&nbsp;&nbsp;Checked
              </label>
              <div className="toggle">
                <input type="checkbox" id="checked" defaultChecked />
                <label className="toggle-label checked-toggle" htmlFor="checked"></label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="date">
                <FaCalendar></FaCalendar>&nbsp;&nbsp;&nbsp;Date
              </label>
              <input type="date" id="date" name="date" defaultValue="2025-04-28" required />
            </div>
            <div className="form-group">
              <label htmlFor="time">
                <FaClock></FaClock>&nbsp;&nbsp;&nbsp;Time
              </label>
              <input type="time" id="time" name="time" defaultValue="21:31" required />
            </div>
            <div className="form-group">
              <label htmlFor="from">
                <FaUser></FaUser>&nbsp;&nbsp;&nbsp;From (Optional)
              </label>
              <input type="text" id="from" name="from" />
              <FaTimes onClick={() => (document.getElementById('from').value = '')}></FaTimes>
            </div>
            <div className="form-group">
              <label htmlFor="notes">
                <FaPencilAlt></FaPencilAlt>&nbsp;&nbsp;&nbsp;Notes (Optional)
              </label>
              <textarea id="notes" name="notes"></textarea>
              <FaChevronDown></FaChevronDown>
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
                Save &gt; +
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default IncomeModal;