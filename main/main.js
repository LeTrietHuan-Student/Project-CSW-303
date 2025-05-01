// main.js

// Login Form Elements
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const rememberCheckbox = document.getElementById('remember');
const forgotPasswordLink = document.getElementById('forgotPassword');
const registerLink = document.getElementById('registerLink');

// Check if user is on magicBudget.html and not logged in
if (window.location.pathname.includes('magicBudget.html')) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        window.location.href = 'LoginSite.html';
    }
}

// Handle Login Form Submission
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Simple authentication (replace with backend API call in production)
        if (username === 'admin' && password === 'password123') {
            alert('Đăng nhập thành công!');

            // Store login state
            localStorage.setItem('isLoggedIn', 'true');

            //kiem tra da dang nhap chua
            if (rememberCheckbox.checked) {
                localStorage.setItem('username', username);
                localStorage.setItem('remember', 'true');
            } else {
                localStorage.removeItem('username');
                localStorage.removeItem('remember');
            }

            // Redirect to magicBudget.html
            window.location.href = 'magicBudget.html';
        } else {
            alert('Tên người dùng hoặc mật khẩu không đúng!');
        }
    });
}

// Handle Forgot Password
if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', function(event) {
        event.preventDefault();
        const email = prompt('Nhập email để khôi phục mật khẩu:');
        
        if (email) {
            alert(`Link khôi phục mật khẩu đã được gửi đến ${email}`);
        } else {
            alert('Vui lòng nhập email!');
        }
    });
}

// Handle Register Link
if (registerLink) {
    registerLink.addEventListener('click', function(event) {
        event.preventDefault();
        alert('Chuyển đến trang đăng ký!');
        window.location.href = 'register.html'; // Ensure register.html exists or update the URL
    });
}

// Load Remembered Username
if (usernameInput && rememberCheckbox) {
    window.onload = function() {
        if (localStorage.getItem('remember') === 'true') {
            usernameInput.value = localStorage.getItem('username') || '';
            rememberCheckbox.checked = true;
        }
    };
}

// Handle Logout (to be called from magicBudget.html)
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('remember');
    alert('Đã đăng xuất!');
    window.location.href = 'LoginSite.html';
}