// đường vào của React 
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // áp dụng css
import App from './App'; // thành phần chính của ứng dụng

const root = ReactDOM.createRoot(document.getElementById('root')); // tạo phần tử root để render ứng dụng
// render thành phần ứng dụng trong chế độ nghiêm ngặt để kjin tra lỗi
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);