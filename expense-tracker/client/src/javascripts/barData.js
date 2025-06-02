// src/javascripts/barData.js

import axios from "axios";

// ————————————————————————————————
// Chart dimensions (unchanged)
// ————————————————————————————————
export const width = 700;
export const height = 300;
export const margin = { top: 20, right: 25, bottom: 30, left: 60 };

export const chartWidth = width - margin.left - margin.right;
export const chartHeight = height - margin.top - margin.bottom;

// ————————————————————————————————
// Fetch & process data from the API
// ————————————————————————————————
/**
 * Fetches expense data from the backend, groups by “MMM D” string,
 * sums values for the same formatted date, sorts chronologically, and
 * returns an array of up to 10 { date: "Jan 5", expense: 1234 } objects.
 *
 * @returns {Promise<Array<{ date: string, expense: number }>>}
 * @throws {Error} if no token is found or axios request fails
 */
export async function fetchBarChartData() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  try {
    const res = await axios.post(
      "http://localhost:500/api/auth/expensesData",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // If API response shape differs, adjust accordingly
    const rawExpenses = Array.isArray(res.data.expenses) ? res.data.expenses : [];

    // 1) Map each raw expense → { date: "Jan 5", rawDate: Date, expense: number }
    const mapped = rawExpenses.map((expense) => {
      const dateObj = new Date(expense.date);
      const options = { month: "short", day: "numeric" };
      const formattedDate = dateObj.toLocaleDateString("en-US", options);

      return {
        date: formattedDate,
        rawDate: dateObj,
        expense: Number(expense.value) || 0,
      };
    });

    // 2) Group by formatted “date” string and sum expenses
    const grouped = mapped.reduce((acc, current) => {
      const existingIndex = acc.findIndex((item) => item.date === current.date);
      if (existingIndex > -1) {
        acc[existingIndex].expense += current.expense;
      } else {
        acc.push({ ...current });
      }
      return acc;
    }, []);

    // 3) Sort by rawDate ascending
    grouped.sort((a, b) => a.rawDate - b.rawDate);

    // 4) Take up to the first 10 entries, then strip out rawDate
    const result = grouped.slice(0, 10).map((item) => ({
      date: item.date,
      expense: item.expense,
    }));

    return result;
  } catch (err) {
    console.error("Error fetching data:", err.message);
    throw new Error(err.message || "Failed to fetch expense data");
  }
}

// ————————————————————————————————
// Pure “scale” functions (no module‐level state)
// ————————————————————————————————
/**
 * Given an index [0..dataLength-1] and the total dataLength,
 * return an x‐coordinate (relative to the left of the inner <g>),
 * centered in each “slot”. If dataLength ≤ 1, return chartWidth/2.
 *
 * @param {number} index
 * @param {number} dataLength
 * @returns {number}
 */
export function xScale(index, dataLength) {
  if (dataLength <= 1) {
    return chartWidth / 2;
  }
  // Divide the total chartWidth into `dataLength` equal slots,
  // then place this bar at the center of its slot.
  const slotWidth = chartWidth / dataLength;
  return index * slotWidth + slotWidth / 2;
}

/**
 * Given a value and the full array of all expense values,
 * return a y‐coordinate (relative to the top of the inner <g>).
 * We fix min = 0, max = Math.max(allValues). If allValues is empty
 * or max === 0, return chartHeight (so bars sit on the x‐axis).
 *
 * @param {number} value
 * @param {number[]} allValues
 * @returns {number}
 */
export function yScale(value, allValues) {
  if (!Array.isArray(allValues) || allValues.length === 0) {
    return chartHeight;
  }
  const max = Math.max(...allValues);
  if (max <= 0) {
    return chartHeight;
  }
  // Interpolate: 0 → chartHeight, max → 0
  const ratio = Math.min(Math.max((value >= 0 ? value : 0) / max, 0), 1);
  return chartHeight - ratio * chartHeight;
}
