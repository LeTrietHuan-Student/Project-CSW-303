// file chinh
/*
// Phan tu dang nhap
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const rememberCheckbox = document.getElementById('remember');
const forgotPasswordLink = document.getElementById('forgotPassword');
const registerLink = document.getElementById('registerLink');

// Kiem tra neu nguoi dung o magicBudget.html va chua dang nhap
if (window.location.pathname.includes('magicBudget.html')) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        window.location.href = 'LoginSite.html';
    }
}

// Xu ly gui form dang nhap
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Xac thuc don gian (thay bang goi API backend trong san pham that)
        if (username === 'admin' && password === 'password123') {
            alert('Dang nhap thanh cong!');

            // Luu trang thai dang nhap
            localStorage.setItem('isLoggedIn', 'true');

            // Kiem tra da dang nhap chua
            if (rememberCheckbox.checked) {
                localStorage.setItem('username', username);
                localStorage.setItem('remember', 'true');
            } else {
                localStorage.removeItem('username');
                localStorage.removeItem('remember');
            }

            // Chuyen huong den magicBudget.html
            window.location.href = 'magicBudget.html';
        } else {
            alert('Ten nguoi dung hoac mat khau khong dung!');
        }
    });
}

// Xu ly quen mat khau
if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', function(event) {
        event.preventDefault();
        const email = prompt('Nhap email de khoi phuc mat khau:');
        
        if (email) {
            alert(`Link khoi phuc mat khau da duoc gui den ${email}`);
        } else {
            alert('Vui long nhap email!');
        }
    });
}

// Xu ly lien ket dang ky
if (registerLink) {
    registerLink.addEventListener('click', function(event) {
        event.preventDefault();
        alert('Chuyen den trang dang ky!');
        window.location.href = 'register.html'; // Dam bao register.html ton tai hoac cap nhat URL
    });
}

// Tai lai ten nguoi dung da luu
if (usernameInput && rememberCheckbox) {
    window.onload = function() {
        if (localStorage.getItem('remember') === 'true') {
            usernameInput.value = localStorage.getItem('username') || '';
            rememberCheckbox.checked = true;
        }
    };
}

// Xu ly dang xuat (duoc goi tu magicBudget.html)
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('remember');
    alert('Da dang xuat!');
    window.location.href = 'LoginSite.html';
}

*/

// Xu ly popup giao dich





