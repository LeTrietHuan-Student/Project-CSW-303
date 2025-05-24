// src/javascripts/barData.js
import * as d3 from "d3";

// Initial data
let barData = JSON.parse(localStorage.getItem("barChartData")) || [
  { date: "22 Tue", expense: 120, color: "#ff4040" },
  { date: "23 Wed", expense: 40, color: "#4caf50" },
  { date: "24 Thu", expense: 20, color: "#ff4040" },
  { date: "25 Fri", expense: 80, color: "#ff4040" },
  { date: "26 Sat", expense: 50, color: "#ff4040" },
  { date: "27 Sun", expense: 30, color: "#ff4040" },
  { date: "28 Mon", expense: 70, color: "#4caf50" },
];

// Chart dimensions
export const width = 800;
export const height = 400;
export const margin = { top: 40, right: 20, bottom: 70, left: 60 };
export const chartWidth = width - margin.left - margin.right;
export const chartHeight = height - margin.top - margin.bottom;

// Scales
export const xScale = (data) =>
  d3
    .scaleBand()
    .domain(data.map((d) => d.date))
    .range([0, chartWidth])
    .padding(0.5);

export const yScale = (data) =>
  d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.expense) + 10]) // Add padding
    .range([chartHeight, 0]);

// Get data
export function getBarChartData() {
  return barData;
}

// Add new data point
export function addDataPoint(newPoint) {
  barData.push(newPoint);
  barData.sort((a, b) => a.date.localeCompare(b.date)); // Sort by date string
  localStorage.setItem("barChartData", JSON.stringify(barData));
}

// Update entire data
export function updateBarChartData(newData) {
  barData = newData;
  barData.sort((a, b) => a.date.localeCompare(b.date));
  localStorage.setItem("barChartData", JSON.stringify(barData));
}