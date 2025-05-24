// src/javascripts/lineChartData.js
import axios from 'axios';

// Initial data
// let data = [
//   { date: "Feb 24", balance: 11500 },
//   { date: "Mar 3", balance: 11500 },
//   { date: "Mar 10", balance: 11500 },
//   { date: "Mar 17", balance: 11500 },
//   { date: "Mar 24", balance: 11400 },
//   { date: "Mar 31", balance: 12500 },
//   { date: "Apr 7", balance: 12500 },
//   { date: "Apr 14", balance: 12400 },
//   { date: "Apr 21", balance: 12500 },
//   { date: "Apr 28", balance: 13500 },
// ];

let data = [];
(async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found. Please log in.');

    const res = await axios.post(
      'http://localhost:500/api/auth/incomeData',
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const incomes = res.data.incomes;
    data = incomes.map(income => {
      const dateObj = new Date(income.date); // Chuyển đổi chuỗi ISO thành đối tượng Date
      const options = { month: 'short', day: 'numeric' }; // Định dạng ngày tháng
      const formattedDate = dateObj.toLocaleDateString('en-US', options);
      return {
        date: formattedDate, // Ngày đã định dạng
        rawDate: dateObj,    // Giữ đối tượng Date để sắp xếp
        balance: income.value // Giữ nguyên balance
      };
    }).reduce((acc, cur) => {
      // Kiểm tra xem ngày hiện tại đã tồn tại trong acc hay chưa
      const existing = acc.find(item => item.date === cur.date);
      if (existing) {
        // Nếu tồn tại, cộng balance của ngày đó
        existing.balance += cur.balance;
      } else {
        // Nếu chưa tồn tại, thêm ngày mới
        acc.push(cur);
      }
      return acc;
    }, [])
    .sort((a, b) => a.rawDate - b.rawDate) // Sắp xếp ngày tăng dần
    .slice(0, 10) // Lấy 10 ngày đầu tiên
    .map(item => ({
      date: item.date, // Chỉ giữ lại ngày định dạng
      balance: item.balance // Và balance
    }));

  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
})();


// Chart dimensions
export const width = 700;
export const height = 300;
export const margin = { top: 20, right: 25, bottom: 30, left: 60 };
export const chartWidth = width - margin.left - margin.right;
export const chartHeight = height - margin.top - margin.bottom;

// Scales
export const xScale = (index, dataLength) => (index * chartWidth) / (dataLength - 1);
export const yScale = (value) => {
  if (!data || data.length === 0) {
    return chartHeight/2; // Giá trị mặc định nếu data chưa sẵn sàng
  }

  const min = Math.min(...data.map(item => item.balance));
  const max = Math.max(...data.map(item => item.balance))+100;
  return chartHeight - ((value - min) * chartHeight) / (max - min);
};

// Generate line path
export const generateLinePath = (data) => {
  if (!data.length) return "";
  let linePath = `M0,${yScale(data[0].balance)}`;
  for (let i = 1; i < data.length; i++) {
    linePath += ` L${xScale(i, data.length)},${yScale(data[i].balance)}`;
  }
  return linePath;
};

// Generate area path
export const generateAreaPath = (data) => {
  if (!data.length) return "";
  let areaPath = `M0,${yScale(data[0].balance)}`;
  for (let i = 1; i < data.length; i++) {
    areaPath += ` L${xScale(i, data.length)},${yScale(data[i].balance)}`;
  }
  areaPath += ` L${xScale(data.length - 1, data.length)},${chartHeight} L0,${chartHeight} Z`;
  return areaPath;
};

// Get data
export function getLineChartData() {
  return data;
}

// Add new data point
export function addDataPoint(newPoint) {
  data.push(newPoint);
  data.sort((a, b) => new Date(a.date) - new Date(b.date));
}

// Update entire data
export function updateLineChartData(newData) {
  data = newData;
  data.sort((a, b) => new Date(a.date) - new Date(b.date));
}