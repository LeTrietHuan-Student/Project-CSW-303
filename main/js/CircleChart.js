
// Dữ liệu chi tiêu cho các tháng
const expenseData = {
    "thang-nay": {
        total: "-3,017.76",
        categories: [
            { name: "Tiền thuê", amount: "-1,479.75", percentage: "49.03%", color: "#ff7f50" },
            { name: "Nhà cửa", amount: "-616.13", percentage: "20.42%", color: "#f4a460" },
            { name: "Ăn uống", amount: "-504.62", percentage: "16.72%", color: "#ff4040" },
            { name: "Mua sắm", amount: "-417.26", percentage: "13.83%", color: "#ffd700" }
        ]
    },
    "thang-truoc": {
        total: "-2,500.00",
        categories: [
            { name: "Tiền thuê", amount: "-1,200.00", percentage: "48.00%", color: "#ff7f50" },
            { name: "Nhà cửa", amount: "-500.00", percentage: "20.00%", color: "#f4a460" },
            { name: "Ăn uống", amount: "-400.00", percentage: "16.00%", color: "#ff4040" },
            { name: "Mua sắm", amount: "-400.00", percentage: "16.00%", color: "#ffd700" }
        ]
    }
};

// Hàm cập nhật biểu đồ và bảng
function updateChart(month) {
    const data = expenseData[month];
    const chart = document.getElementById('chart');
    const totalExpense = document.getElementById('total-expense');
    const table = document.getElementById('expense-table');

    // Cập nhật tổng chi tiêu
    totalExpense.textContent = data.total;

    // Tạo gradient cho biểu đồ tròn
    let gradient = '';
    let accumulatedPercentage = 0;
    data.categories.forEach(category => {
        const percentage = parseFloat(category.percentage);
        gradient += `${category.color} ${accumulatedPercentage}% ${accumulatedPercentage + percentage}%`;
        accumulatedPercentage += percentage;
        if (category !== data.categories[data.categories.length - 1]) {
            gradient += ', ';
        }
    });
    chart.style.background = `conic-gradient(${gradient})`;

    // Cập nhật bảng
    table.innerHTML = `
        <tr>
            <th>DANH MỤC</th>
            <th>CHI TIÊU</th>
        </tr>
        ${data.categories.map(category => `
            <tr>
                <td><span class="tag-color" style="background-color: ${category.color};"></span>${category.name}</td>
                <td>${category.amount} (${category.percentage})</td>
            </tr>
        `).join('')}
        <tr>
            <td><strong>TỔNG</strong></td>
            <td><strong>${data.total} (100.00%)</strong></td>
        </tr>
    `;
}

// Khởi tạo với dữ liệu tháng này
updateChart('thang-nay');
                