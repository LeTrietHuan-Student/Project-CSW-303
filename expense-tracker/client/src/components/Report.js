import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/budget.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

function Report() {
    const [isSidebarActive, setIsSidebarActive] = useState(false);

    const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
    };
    const currentYear = new Date().getFullYear();
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Tháng bắt đầu từ 1
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);

    // Tạo danh sách tháng (1-12)
    const months = Array.from({ length: 12 }, (_, i) => ({
        value: i + 1,
        label: new Date(0, i).toLocaleString("default", { month: "long" }),
    }));

    // Tạo danh sách năm (ví dụ: 10 năm trước và sau năm hiện tại)
    const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

    // Fetch dữ liệu khi tháng hoặc năm thay đổi
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await axios.post(
                `http://localhost:500/api/auth/reportData?month=${selectedMonth}&year=${selectedYear}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
                );
                setIncomes(res.data.incomes);
                setExpenses(res.data.expenses);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
    fetchData();
    }, [selectedMonth, selectedYear]);

  // Hàm xóa mục
    const handleDelete = async (type, id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:500/api/auth/${type}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (type === "income") {
        setIncomes(incomes.filter((item) => item._id !== id));
      } else {
        setExpenses(expenses.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

    // Hàm chỉnh sửa (sử dụng prompt để đơn giản)
    const handleEdit = async (type, id, currentValue, currentDate) => {
        // Chuyển đổi ngày hiện tại thành định dạng MM/DD/YYYY
        const dateObj = new Date(currentDate);
        const formattedDate = `${
            dateObj.getMonth() + 1
        }/${dateObj.getDate()}/${dateObj.getFullYear()}`;

        // Yêu cầu người dùng nhập giá trị mới và ngày mới
        const newValue = prompt("Nhập giá trị mới:", currentValue);
        const newDateInput = prompt("Nhập ngày mới (MM/DD/YYYY):", formattedDate);

        if (newValue && newDateInput) {
            // Chuyển đổi ngày nhập từ định dạng MM/DD/YYYY sang định dạng ISO
            const [month, day, year] = newDateInput.split("/").map(Number);
            const newDate = new Date(year, month - 1, day);

            if (!isNaN(newDate)) {
                // Chuyển sang định dạng ISO để gửi đến API
                const isoDate = newDate.toISOString();
                const token = localStorage.getItem("token");
                try {
                    const res = await axios.put(
                        `http://localhost:500/api/auth/${type}/${id}`,
                        { value: newValue, date: isoDate },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    if (type === "income") {
                        setIncomes(incomes.map((item) => (item._id === id ? res.data.income : item)));
                    } else {
                        setExpenses(expenses.map((item) => (item._id === id ? res.data.expense : item)));
                    }
                } catch (err) {
                    console.error("Error updating:", err);
                }
            } else {
                alert("Ngày không hợp lệ. Vui lòng nhập theo định dạng MM/DD/YYYY.");
            }
        }
    };

  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />
      <div className="mainLayout">
        <Sidebar isActive={isSidebarActive} />
        <div className="main-content">
            <h2>Báo cáo</h2>
            <div style={{ marginBottom: "20px" }}>
                <label>Chọn tháng: </label>
                <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                >
                {months.map((month) => (
                    <option key={month.value} value={month.value}>
                    {month.label}
                    </option>
                ))}
                </select>
                <label style={{ marginLeft: "10px" }}>Chọn năm: </label>
                <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                >
                {years.map((year) => (
                    <option key={year} value={year}>
                    {year}
                    </option>
                ))}
                </select>
            </div>

            <h3>Thu nhập</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                <tr>
                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>Ngày</th>
                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>Số tiền</th>
                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {incomes.map((income) => (
                    <tr key={income._id}>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        {new Date(income.date).toLocaleDateString()}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        {income.value}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        <button
                        onClick={() => handleEdit("income", income._id, income.value, income.date)}
                        style={{ marginRight: "5px" }}
                        >
                        Sửa
                        </button>
                        <button onClick={() => handleDelete("income", income._id)}>Xóa</button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h3>Chi tiêu</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                <tr>
                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>Ngày</th>
                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>Số tiền</th>
                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {expenses.map((expense) => (
                    <tr key={expense._id}>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        {new Date(expense.date).toLocaleDateString()}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        {expense.value}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        <button
                        onClick={() => handleEdit("expense", expense._id, expense.value, expense.date)}
                        style={{ marginRight: "5px" }}
                        >
                        Sửa
                        </button>
                        <button onClick={() => handleDelete("expense", expense._id)}>Xóa</button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
      </div>
      <Footer />
      
    </div>
  );
}

export default Report;