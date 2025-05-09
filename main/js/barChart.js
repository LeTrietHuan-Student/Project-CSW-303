const barData = [
    { date: "22 Tue", expense: 120, color: "#ff4040" },
    { date: "23 Wed", expense: 40, color: "#4caf50" },
    { date: "24 Thu", expense: 20, color: "#ff4040" },
    { date: "25 Fri", expense: 80, color: "#ff4040" },
    { date: "26 Sat", expense: 50, color: "#ff4040" },
    { date: "27 Sun", expense: 30, color: "#ff4040" },
    { date: "28 Mon", expense: 70, color: "#4caf50" }
];

function initBarChart() {
    const barSvg = d3.select(".barChart .chart-container svg");
    const barHeight = 400;
    const barMargin = { top: 40, right: 20, bottom: 70, left: 60 };
    const barChartWidth = 800 - barMargin.left - barMargin.right;
    const barChartHeight = barHeight - barMargin.top - barMargin.bottom;

    barSvg.attr("width", 800).attr("height", barHeight);

    const barG = barSvg.append("g")
        .attr("transform", `translate(${barMargin.left},${barMargin.top})`);

    const xScaleBar = d3.scaleBand()
        .domain(barData.map(d => d.date))
        .range([0, barChartWidth])
        .padding(0.5);

    const yScaleBar = d3.scaleLinear()
        .domain([0, d3.max(barData, d => d.expense)])
        .range([barChartHeight, 0]);

    barG.selectAll("rect")
        .data(barData)
        .enter()
        .append("rect")
        .attr("x", d => xScaleBar(d.date))
        .attr("y", d => yScaleBar(d.expense))
        .attr("width", xScaleBar.bandwidth())
        .attr("height", d => barChartHeight - yScaleBar(d.expense))
        .attr("fill", d => d.color)
        .on("mouseover", function (event, d) {
            d3.select(this).attr("opacity", 0.7);
            tooltip.style.display = "block";
            tooltip.innerHTML = `<div>${d.date}</div><div>Expense: $${d.expense}</div>`;
        })
        .on("mousemove", function (event) {
            tooltip.style.left = `${event.pageX + 10}px`;
            tooltip.style.top = `${event.pageY + 10}px`;
        })
        .on("mouseout", function () {
            d3.select(this).attr("opacity", 1);
            tooltip.style.display = "none";
        });

    barG.append("g")
        .attr("transform", `translate(0,${barChartHeight})`)
        .call(d3.axisBottom(xScaleBar))
        .selectAll("text")
        .style("font-size", "14px")
        .attr("transform", "rotate(-45)")
        .attr("text-anchor", "end");

    barG.append("g")
        .call(d3.axisLeft(yScaleBar).tickFormat(d => `$${d}`))
        .selectAll("text")
        .style("font-size", "14px");

    const tooltip = document.createElement("div");
    tooltip.className = "chart-tooltip";
    document.body.appendChild(tooltip);
}

document.addEventListener("DOMContentLoaded", initBarChart);