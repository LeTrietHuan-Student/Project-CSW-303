// src/components/LineChart.jsx
import React, { useState, useRef, useEffect } from "react";
import balance from "../images/balance.png";
import {
  getLineChartData,
  addDataPoint,
  xScale,
  yScale,
  generateLinePath,
  generateAreaPath,
  yTicks,
  width,
  height,
  margin,
  chartWidth,
  chartHeight,
} from "../javascripts/lineData";

function LineChart() {
  const [data, setData] = useState(getLineChartData());
  const [newPoint, setNewPoint] = useState({ date: "", balance: "" });
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);

  // Initialize tooltip div
  useEffect(() => {
    if (!tooltipRef.current) {
      const tooltip = document.createElement("div");
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
    setData(getLineChartData());
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPoint((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPoint.date && newPoint.balance) {
      const balance = parseFloat(newPoint.balance);
      if (!isNaN(balance)) {
        addDataPoint({
          date: newPoint.date,
          balance,
        });
        setData([...getLineChartData()]); // Trigger re-render
        setNewPoint({ date: "", balance: "" }); // Reset form
      }
    }
  };

  // Handle mouse events for circles
  const handleMouseOver = (d, event) => {
    // console.log("Mouse over:", d, event.pageX, event.pageY);
    if (tooltipRef.current) {
      tooltipRef.current.style.display = "block";
      tooltipRef.current.innerHTML = `<div>${d.date}</div><div>$${d.balance.toLocaleString()}</div>`;
      tooltipRef.current.style.left = `${event.pageX - 30}px`;
      tooltipRef.current.style.top = `${event.pageY + 10}px`;
    }
  };

  const handleMouseMove = (event) => {
    // console.log("Mouse move:", event.pageX, event.pageY); 
    if (tooltipRef.current) {
      tooltipRef.current.style.left = `${event.pageX - 30}px`;
      tooltipRef.current.style.top = `${event.pageY + 10}px`;
    }
  };

  const handleMouseOut = () => {
    // console.log("Mouse out"); 
    if (tooltipRef.current) {
      tooltipRef.current.style.display = "none";
    }
  };

  return (
    <div className="lineChart">
      <div className="chart-placeholder">
        <div className="chart-container">
          <svg ref={svgRef} width={width} height={height}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
              {/* Area under the line */}
              <path
                d={generateAreaPath(data)}
                className="area"
                fill="lightblue"
                style={{ pointerEvents: "none" }}
              />
              {/* Line */}
              <path
                d={generateLinePath(data)}
                className="line"
                stroke="steelblue"
                fill="none"
                strokeWidth="2"
                style={{ pointerEvents: "none" }}
              />
              {/* X-axis labels */}
              {data.map((d, i) => (
                <text
                  key={`x-axis-${i}`}
                  x={xScale(i, data.length)}
                  y={chartHeight + 20}
                  textAnchor="middle"
                  fontSize="12"
                >
                  {d.date}
                </text>
              ))}
              {/* Y-axis labels and grid lines */}
              {yTicks.map((value, i) => (
                <g key={`y-axis-${i}`}>
                  <text
                    x={-10}
                    y={yScale(value)}
                    textAnchor="end"
                    dy="0.32em"
                    fontSize="12"
                  >
                    ${value / 1000}k
                  </text>
                  <line
                    x1={0}
                    y1={yScale(value)}
                    x2={chartWidth}
                    y2={yScale(value)}
                    stroke="#ccc"
                    strokeWidth="1"
                  />
                </g>
              ))}
              {/* Data points (circles) */}
              {data.map((d, i) => (
                <circle
                  key={`circle-${i}`}
                  cx={xScale(i, data.length)}
                  cy={yScale(d.balance)}
                  r={6} // Increased for easier hovering
                  fill="steelblue"
                  style={{ pointerEvents: "all" }}
                  onMouseOver={(e) => handleMouseOver(d, e)}
                  onMouseMove={handleMouseMove}
                  onMouseOut={handleMouseOut}
                />
              ))}
            </g>
          </svg>
        </div>
        <img src={balance} alt="Balance" />
      </div>
    </div>
  );
}

export default LineChart;