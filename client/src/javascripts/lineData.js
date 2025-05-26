// src/javascripts/lineChartData.js

// Initial data
let data = [
  { date: "Feb 24", balance: 11500 },
  { date: "Mar 3", balance: 11500 },
  { date: "Mar 10", balance: 11500 },
  { date: "Mar 17", balance: 11500 },
  { date: "Mar 24", balance: 11400 },
  { date: "Mar 31", balance: 12500 },
  { date: "Apr 7", balance: 12500 },
  { date: "Apr 14", balance: 12400 },
  { date: "Apr 21", balance: 12500 },
  { date: "Apr 28", balance: 13500 },
];

// Chart dimensions
export const width = 700;
export const height = 300;
export const margin = { top: 20, right: 25, bottom: 30, left: 60 };
export const chartWidth = width - margin.left - margin.right;
export const chartHeight = height - margin.top - margin.bottom;

// Scales
export const xScale = (index, dataLength) => (index * chartWidth) / (dataLength - 1);
export const yScale = (value) => {
  const min = 11000;
  const max = 14000;
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

// Y-axis ticks
export const yTicks = [11000, 11500, 12000, 12500, 13000, 13500, 14000];

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