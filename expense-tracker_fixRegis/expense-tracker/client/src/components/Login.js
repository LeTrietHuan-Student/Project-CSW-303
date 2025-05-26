import React, { useState } from "react";  // thành phần cho đăng nhập
import axios from "axios";  // để tạo yêu caaiuf API
// import { useState } from "react"; // để quản lý trạng thái
// import { useNavigate } from "react-router-dom";
import "../styles/LoginSite.css";


function Login() {
  const [email, setEmail] = useState(""); // trạng thái cho email
  const [password, setPassword] = useState(""); // trạng thái cho mật khẩu
  const [error, setError] = useState(""); // trạng thái cho lỗi
  // const navigate = useNavigate();

  // xử lý người dùng gửi forrm
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn gửi form mặc định( chả biết này nghĩa là gì, copy từ vid xuống :>> )
    try {
      const res = await axios.post("http://localhost:500/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token); // Lưu token vào localStorage
      window.location.href = "/addexpense";
      // navigate("/expenses"); 
    } catch (err) {
      setError(err.response?.data?.msg || "Invalid credentials"); // Hiển thị lỗi từ API nếu có
    }
  };

  return (
    <>
      {/* Metadata and Styles */}
      <link rel="shortcut icon" href="Design/logopng.png" type="image/x-icon" />
      <title>Login Form</title>
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
        rel="stylesheet"
      />
    <div className="login-page">
      <span className="magic-budget-logo"></span>
      <div className="wrapper">
        <form id="loginForm" onSubmit={handleSubmit}>
          <h1>Log in</h1>
          {error && <p className="error-message">{error}</p>} {/* Hiển thị lỗi */}
          <div className="input_box">
            <input
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Cập nhật email
              required
            />
            <i className="bx bx-user"></i>
          </div>
          <div className="input_box">
            <input
              type="password"
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Cập nhật password
              required
            />
            <i className="bx bx-lock"></i>
          </div>
          <div className="remember_forgot">
            <label>
              <input type="checkbox" id="remember" /> Remember login
            </label>
            <a href="/forgot-password" id="forgotPassword">
              Forgot password?
            </a>
          </div>
          <button type="submit" className="btn">
            Log in
          </button>
          <div className="register_link">
            Don't have an account? 
            <a href="/register" id="registerLink"> 
              &nbsp;Register
            </a>
          </div>
        </form>
      </div>
    </div>
  </>
  );
}

export default Login;
