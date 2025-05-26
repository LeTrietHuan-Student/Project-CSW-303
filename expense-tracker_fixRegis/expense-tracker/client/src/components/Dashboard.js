import React, { useState, useEffect } from 'react'; // xem vaf quản lý chi tiêu
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // API LETS GOOOOOO
import ExpenseForm from './AddExpense';

function Dashboard() { // lưu trucng chi tiêu
    const [expenses, setExpenses] = useState([]); 
    const navigate = useNavigate();

    // gọi API để lấy danh sách chi tiêu khi component được mount (ko hiểu mount lắm )
    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:500/api/expenses', { // lấy dxuw liệu từ backend
                    headers: { Authorization: `Bearer ${token}` }
                });
                setExpenses(response.data);
            } catch (err) {
                navigate('/'); // đưa về login nếu ko có phép
            }
        };
        fetchExpenses();
    }, [navigate]);
    
    // cập nhập trạng thái chi tiêu khi có thay đổi
    const handleAddExpense = (newExpense) => {
        setExpenses([...expenses, newExpense]);
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:500/api/expenses/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setExpenses(expenses.filter(expense => expense.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center">Expense Tracker</h1>
                <ExpenseForm onAddExpense={handleAddExpense} />
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-4">Expenses</h2>
                    {expenses.length === 0 ? (
                        <p>No expenses yet.</p>
                    ) : (
                        <ul className="space-y-4">
                            {expenses.map(expense => (
                                <li key={expense.id} className="bg-white p-4 rounded shadow flex justify-between">
                                    <div>
                                        <p><strong>Amount:</strong> ${expense.amount}</p>
                                        <p><strong>Description:</strong> {expense.description}</p>
                                        <p><strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(expense.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;