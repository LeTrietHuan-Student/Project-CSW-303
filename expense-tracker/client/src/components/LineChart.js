// src/components/LineChart.jsx
import React, { useState, useRef, useEffect } from "react";
import balance from "../images/balance.png";
import axios from "axios";
import {
  xScale,
  yScale,
  generateLinePath,
  generateAreaPath,
  width,
  height,
  margin,
  chartWidth,
  chartHeight,
} from "../javascripts/lineData";

function LineChart() {
  const [data, setData] = useState([]); // Dữ liệu ban đầu rỗng
  const [loading, setLoading] = useState(true); // Trạng thái đang tải
  const [error, setError] = useState(null); // Trạng thái lỗi
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);

  // Fetch dữ liệu khi component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Bắt đầu tải
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found. Please log in.");

        const res = await axios.post(
          "http://localhost:500/api/auth/incomeData",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const incomes = res.data.incomes || []; // Đảm bảo incomes không null
        const processedData = incomes
          .map((income) => {
            const dateObj = new Date(income.date);
            const options = { month: "short", day: "numeric" };
            const formattedDate = dateObj.toLocaleDateString("en-US", options);
            return {
              date: formattedDate,
              rawDate: dateObj,
              balance: income.value,
            };
          })
          .reduce((acc, cur) => {
            const existing = acc.find((item) => item.date === cur.date);
            if (existing) {
              existing.balance += cur.balance;
            } else {
              acc.push(cur);
            }
            return acc;
          }, [])
          .sort((a, b) => a.rawDate - b.rawDate) // Sắp xếp theo ngày tăng dần
          .slice(0, 10) // Lấy 10 ngày đầu tiên
          .map((item) => ({
            date: item.date,
            balance: item.balance,
          }));

        setData(processedData);
        setLoading(false); // Hoàn tất tải
      } catch (err) {
        console.error("Error fetching data:", err.message);
        setError(err.message);
        setLoading(false); // Hoàn tất tải dù có lỗi
      }
    };

    fetchData();
  }, []); // Chỉ chạy khi mount

  // Tính toán yTicks dựa trên dữ liệu
  const yTicks = data.length > 0 ? (() => {
    const min = Math.min(...data.map((item) => item.balance));
    const max = Math.max(...data.map((item) => item.balance));
    const numTicks = 7;
    const gap = (max - min) / (numTicks - 1);
    return Array.from({ length: numTicks }, (_, i) => Math.round((min + i * gap) / 100) * 100);
  })() : [];

  // Khởi tạo tooltip
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

    return () => {
      if (tooltipRef.current) {
        document.body.removeChild(tooltipRef.current);
        tooltipRef.current = null;
      }
    };
  }, []);

  // Xử lý sự kiện chuột cho tooltip
  const handleMouseOver = (d, event) => {
    if (tooltipRef.current) {
      tooltipRef.current.style.display = "block";
      tooltipRef.current.innerHTML = `<div>${d.date}</div><div>$${d.balance.toLocaleString()}</div>`;
      tooltipRef.current.style.left = `${event.pageX - 30}px`;
      tooltipRef.current.style.top = `${event.pageY + 10}px`;
    }
  };

  const handleMouseMove = (event) => {
    if (tooltipRef.current) {
      tooltipRef.current.style.left = `${event.pageX - 30}px`;
      tooltipRef.current.style.top = `${event.pageY + 10}px`;
    }
  };

  const handleMouseOut = () => {
    if (tooltipRef.current) {
      tooltipRef.current.style.display = "none";
    }
  };

  // Render giao diện dựa trên trạng thái
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="lineChart">
      <div className="chart-placeholder">
        <div className="chart-container">
          <svg ref={svgRef} width={width} height={height}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
              {/* Vùng dưới đường */}
              <path
                d={generateAreaPath(data)}
                className="area"
                fill="lightblue"
                style={{ pointerEvents: "none" }}
              />
              {/* Đường */}
              <path
                d={generateLinePath(data)}
                className="line"
                stroke="steelblue"
                fill="none"
                strokeWidth="2"
                style={{ pointerEvents: "none" }}
              />
              {/* Nhãn trục X */}
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
              {/* Nhãn và lưới trục Y */}
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
              {/* Điểm dữ liệu */}
              {data.map((d, i) => (
                <circle
                  key={`circle-${i}`}
                  cx={xScale(i, data.length)}
                  cy={yScale(d.balance)}
                  r={6}
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