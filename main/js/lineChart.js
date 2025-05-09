
// Dữ liệu
const data = [
    { date: 'Feb 24', balance: 11500 },
    { date: 'Mar 3', balance: 11500 },
    { date: 'Mar 10', balance: 11500 },
    { date: 'Mar 17', balance: 11500 },
    { date: 'Mar 24', balance: 11400 },
    { date: 'Mar 31', balance: 12500 },
    { date: 'Apr 7', balance: 12500 },
    { date: 'Apr 14', balance: 12400 },
    { date: 'Apr 21', balance: 12500 },
    { date: 'Apr 28', balance: 13500 }
];

// Kích thước biểu đồ
const width = 700;
const height = 300;
const margin = { top: 20, right: 25, bottom: 30, left: 60 };
const chartWidth = width - margin.left - margin.right;
const chartHeight = height - margin.top - margin.bottom;

// Tạo SVG
const svg = document.querySelector('svg');
svg.setAttribute('width', width);
svg.setAttribute('height', height);

const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
g.setAttribute('transform', `translate(${margin.left},${margin.top})`);
svg.appendChild(g);

// Tỷ lệ
const xScale = (index) => (index * chartWidth) / (data.length - 1);
const yScale = (value) => {
    const min = 11000;
    const max = 14000;
    return chartHeight - ((value - min) * chartHeight) / (max - min);
};

// Tạo tooltip
const tooltip = document.createElement('div');
tooltip.style.position = 'absolute';
tooltip.style.backgroundColor = 'white';
tooltip.style.border = '1px solid #ccc';
tooltip.style.borderRadius = '5px';
tooltip.style.padding = '5px';
tooltip.style.boxShadow = '0 0 5px rgba(0,0,0,0.2)';
tooltip.style.pointerEvents = 'none';
tooltip.style.display = 'none';
document.body.appendChild(tooltip);
// Vẽ đường
let linePath = `M0,${yScale(data[0].balance)}`;
for (let i = 1; i < data.length; i++) {
    linePath += ` L${xScale(i)},${yScale(data[i].balance)}`;
}

const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
line.setAttribute('d', linePath);
line.setAttribute('class', 'line');
g.appendChild(line);

// Vẽ vùng dưới đường
let areaPath = `M0,${yScale(data[0].balance)}`;
for (let i = 1; i < data.length; i++) {
    areaPath += ` L${xScale(i)},${yScale(data[i].balance)}`;
}
areaPath += ` L${xScale(data.length - 1)},${chartHeight} L0,${chartHeight} Z`;

const area = document.createElementNS('http://www.w3.org/2000/svg', 'path');
area.setAttribute('d', areaPath);
area.setAttribute('class', 'area');
g.appendChild(area);

// Vẽ trục x
data.forEach((d, i) => {
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', xScale(i));
    text.setAttribute('y', chartHeight + 20);
    text.setAttribute('text-anchor', 'middle');
    text.textContent = d.date;
    g.appendChild(text);
});

// Vẽ trục y
const yTicks = [11000, 11500, 12000, 12500, 13000, 13500, 14000];
yTicks.forEach(value => {
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', -10);
    text.setAttribute('y', yScale(value));
    text.setAttribute('text-anchor', 'end');
    text.setAttribute('dy', '0.32em');
    text.textContent = `$${value / 1000}k`;
    g.appendChild(text);

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', 0);
    line.setAttribute('y1', yScale(value));
    line.setAttribute('x2', chartWidth);
    line.setAttribute('y2', yScale(value));
    line.setAttribute('stroke', '#ccc');
    g.appendChild(line);
});

data.forEach((d, i) => {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', xScale(i)); // Tọa độ x
    circle.setAttribute('cy', yScale(d.balance)); // Tọa độ y
    circle.setAttribute('r', 4); // Bán kính chấm tròn
    circle.setAttribute('fill', 'steelblue'); // Màu chấm tròn

    // Thêm sự kiện chuột
    circle.addEventListener('mouseover', (event) => {
        tooltip.style.display = 'block';
        tooltip.innerHTML = `<div>${d.date}</div><div>$${d.balance.toLocaleString()}</div>`;
    });
    circle.addEventListener('mousemove', (event) => {
        tooltip.style.left = `${event.pageX-30}px`;
        tooltip.style.top = `${event.pageY + 10}px`;
    });
    circle.addEventListener('mouseout', () => {
        tooltip.style.display = 'none';
    });

    g.appendChild(circle);
});
