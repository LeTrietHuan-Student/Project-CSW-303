// Initial expense data (can be replaced with user input or API data)
let expenseData = {
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

// Function to get expense data for a specific month
export function getExpenseData(month) {
  return expenseData[month] || { total: "0", categories: [] };
}

// Function to add a new category for a specific month
export function addCategory(month, newCategory) {
  if (!expenseData[month]) {
    expenseData[month] = { total: "0", categories: [] };
  }
  expenseData[month].categories.push(newCategory);
  updateTotal(month);
}

// Function to update the total and percentages for a month
export function updateTotal(month) {
  const categories = expenseData[month].categories;
  const total = categories
    .reduce((sum, category) => sum + parseFloat(category.amount.replace(",", "")), 0)
    .toFixed(2);
  expenseData[month].total = total < 0 ? `-${Math.abs(total).toLocaleString()}` : total.toLocaleString();
  
  // Recalculate percentages
  const totalAbs = Math.abs(total);
  categories.forEach(category => {
    const amountAbs = Math.abs(parseFloat(category.amount.replace(",", "")));
    category.percentage = totalAbs ? ((amountAbs / totalAbs) * 100).toFixed(2) + "%" : "0%";
  });
}

// Function to update entire data for a month (e.g., from user input)
export function updateExpenseData(month, newData) {
  expenseData[month] = newData;
  updateTotal(month);
}

// Function to get all available months
export function getAvailableMonths() {
  return Object.keys(expenseData);
}

export default expenseData;