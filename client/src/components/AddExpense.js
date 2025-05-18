import React, { useState } from 'react';
import axios from 'axios';

function AddExpense({ onAddExpense }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/expenses',
        { description, amount, category },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDescription('');
      setAmount('');
      setCategory('');
      onAddExpense();
    } catch (err) {
      setError('Failed to add expense');
    }
  };

  return (
    <div>
      <h3>Add Expense</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}

export default AddExpense;