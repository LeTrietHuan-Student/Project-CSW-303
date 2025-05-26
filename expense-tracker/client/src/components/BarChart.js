// src/components/BarChart.jsx
import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import {
  getBarChartData,
  addDataPoint,
  xScale,
  yScale,
  width,
  height,
  margin,
  chartWidth,
  chartHeight,
} from "../javascripts/barData";

function BarChart() {
  const [data, setData] = useState(getBarChartData());
  const [newPoint, setNewPoint] = useState({ date: "", expense: "", color: "#ff4040" });
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);

  // Initialize tooltip div
  useEffect(() => {
    if (!tooltipRef.current) {
      const tooltip = document.createElement("div");
      tooltip.className = "chart-tooltip";
      tooltip.style.position = "absolute";
      tooltip.style.backgroundColor = "white";
      tooltip.style.border = "1px solid #ccc";
      tooltip.style.borderRadius = "5px";
      tooltip.style.padding = "5px";
      tooltip.style.boxShadow = "0 0 5px rgba(0,0,0,0.2)";
      tooltip.style.pointerEvents = "none";
      tooltip.style.display = "none";
      tooltip.style.zIndex = "1000";
      document.body.appendChild(tooltip);
      tooltipRef.current = tooltip;
    }

    // Cleanup on unmount
    return () => {
      if (tooltipRef.current) {
        document.body.removeChild(tooltipRef.current);
        tooltipRef.current = null;
      }
    };
  }, []);

  // Update data when external changes occur
  useEffect(() => {
    setData(getBarChartData());
  }, []);

  // Render axes
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll(".axis").remove(); // Clear previous axes

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X-axis
    g.append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(xScale(data)))
      .selectAll("text")
      .style("font-size", "14px")
      .attr("transform", "rotate(-45)")
      .attr("text-anchor", "end");

    // Y-axis
    g.append("g")
      .call(d3.axisLeft(yScale(data)).tickFormat((d) => `$${d}`))
      .selectAll("text")
      .style("font-size", "14px");
  }, [data]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPoint((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPoint.date && newPoint.expense) {
      const expense = parseFloat(newPoint.expense);
      if (!isNaN(expense) && expense >= 0) {
        addDataPoint({
          date: newPoint.date,
          expense,
          color: newPoint.color,
        });
        setData([...getBarChartData()]); // Trigger re-render
        setNewPoint({ date: "", expense: "", color: "#ff4040" }); // Reset form
      }
    }
  };

  // Handle mouse events for bars
  const handleMouseOver = (d, event) => {
    // console.log("Mouse over:", d, event.pageX, event.pageY); 
    if (tooltipRef.current) {
      tooltipRef.current.style.display = "block";
      tooltipRef.current.innerHTML = `<div>${d.date}</div><div>Expense: $${d.expense}</div>`;
      tooltipRef.current.style.left = `${event.pageX + 10}px`;
      tooltipRef.current.style.top = `${event.pageY + 10}px`;
    }
    d3.select(event.currentTarget).attr("opacity", 0.7);
  };

  const handleMouseMove = (event) => {
    // console.log("Mouse move:", event.pageX, event.pageY); 
    if (tooltipRef.current) {
      tooltipRef.current.style.left = `${event.pageX + 10}px`;
      tooltipRef.current.style.top = `${event.pageY + 10}px`;
    }
  };

  const handleMouseOut = (event) => {
    // console.log("Mouse out"); 
    if (tooltipRef.current) {
      tooltipRef.current.style.display = "none";
    }
    d3.select(event.currentTarget).attr("opacity", 1);
    
  };

  return (
    <div className="barChart">
      <div className="chart-placeholder">
        <h2>Daily Expenses for the Last 7 Days</h2>
        <div className="chart-container">
          <svg ref={svgRef}>
            <g transform={`translate(${margin.left},${margin.top})`}>
              {data.map((d, i) => (
                <rect
                  key={`bar-${i}`}
                  x={xScale(data)(d.date)}
                  y={yScale(data)(d.expense)}
                  width={xScale(data).bandwidth()}
                  height={chartHeight - yScale(data)(d.expense)}
                  fill={d.color}
                  style={{ pointerEvents: "all" }}
                  onMouseOver={(e) => handleMouseOver(d, e)}
                  onMouseMove={handleMouseMove}
                  onMouseOut={handleMouseOut}
                />
              ))}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default BarChart;