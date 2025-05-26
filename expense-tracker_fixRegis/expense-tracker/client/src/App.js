// thành phần chính của để routing cho phaafnf front end
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login'; //login page
import Register from './components/Register'; //register page
import Dashboard from './components/Dashboard';// 2 cái dưới chắc biết gif r
import Addexpense from './components/AddExpense';
import './App.css';

function App() {
  return (
    // kích hoạt router 
    <Router> 
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />   {/*đường dẫn đến trang đăng nhập*/}
          <Route path="/register" element={<Register />} /> {/*đường dẫn đến regisster*/}
          <Route path="/dashboard" element={<Dashboard />} />{/*đường dẫn đến dashboard*/}
          <Route path="/addexpense" element={<Addexpense />} />{/*đường dẫn đến trang  chi phí*/}
        </Routes>
      </div>
    </Router>
  );
}

export default App;