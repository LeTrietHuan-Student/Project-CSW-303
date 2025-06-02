// src/components/BarChart.js

import React, { useState, useEffect, useRef } from "react";
import {
  fetchBarChartData,
  xScale,
  yScale,
  width,
  height,
  margin,
  chartWidth,
  chartHeight,
} from "../javascripts/barData";

function BarChart() {
  const [data, setData] = useState([]); // holds [{ date, expense }, …]
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const containerRef = useRef(null);

  // Fetch data once on mount
  useEffect(() => {
    fetchBarChartData()
      .then((arr) => {
        setData(arr);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Unknown error");
        setLoading(false);
      });
  }, []);

  // Prepare an array of all expense values for yScale
  const allValues = data.map((d) => d.expense);

  // Compute Y‐axis tick values (7 ticks from 0 to max)
  const yTicks = (() => {
    if (allValues.length === 0) return [];
    const maxVal = Math.max(...allValues);
    const numTicks = 7;
    const step = maxVal / (numTicks - 1 || 1);

    // Round each tick to nearest thousand, then dedupe & sort
    const raw = Array.from({ length: numTicks }, (_, i) => i * step);
    const rounded = raw.map((v) => Math.round(v / 1000) * 1000);
    return Array.from(new Set(rounded)).sort((a, b) => a - b);
  })();

  // Early returns in case of loading, error, or no data conditions
  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }
  if (error) {
    return <div className="text-center py-4 text-red-600">Error: {error}</div>;
  }
  if (data.length === 0) {
    return <div className="text-center py-4">No data available</div>;
  }

  return (
    <div
      className="barChart relative overflow-visible mx-auto"
      ref={containerRef}
      style={{ width, height: height + 50, margin: "0 auto" }} // center the container
    >
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Y‐axis baseline */}
          <line x1={0} y1={0} x2={0} y2={chartHeight} stroke="#000" />

          {/* X‐axis baseline */}
          <line x1={0} y1={chartHeight} x2={chartWidth} y2={chartHeight} stroke="#000" />

          {/* Y‐axis ticks & grid lines */}
          {yTicks.map((value, i) => (
            <g key={`y-tick-${i}`}>
              <text
                x={-10}
                y={yScale(value, allValues)}
                textAnchor="end"
                dy="0.32em"
                fontSize="12"
                fill="#333"
              >
                ${value / 1000}k
              </text>
              <line
                x1={0}
                y1={yScale(value, allValues)}
                x2={chartWidth}
                y2={yScale(value, allValues)}
                stroke="#ccc"
                strokeWidth={1}
              />
            </g>
          ))}

          {/* Bars */}
          {data.map((d, i) => {
            const slotWidth = chartWidth / data.length;
            const gap = 5; // adjust for the gap between columns
            const barWidth = slotWidth - gap;
            const barX = xScale(i, data.length) - barWidth / 2;
            const barY = yScale(d.expense, allValues);
            const barHeight = chartHeight - barY;

            return (
              <rect
                key={`bar-${i}`}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill="steelblue"
                stroke="red" // light border around columns
                strokeWidth={2}
              >
                <title>{`${d.date}: $${d.expense.toLocaleString()}`}</title>
              </rect>
            );
          })}

          {/* X‐axis labels */}
          {data.map((d, i) => (
            <text
              key={`x-label-${i}`}
              x={xScale(i, data.length)}
              y={chartHeight + 20}
              textAnchor="middle"
              fontSize="12"
              fill="#333"
            >
              {d.date}
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
}

export default BarChart;
