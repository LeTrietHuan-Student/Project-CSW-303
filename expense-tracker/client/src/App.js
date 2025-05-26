import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AddExpense from './components/AddExpense';
// import Analytics from './components/Analytics'; 
import Reports from './components/Report'; 
// import Settings from './components/Settings'; 
// import Overview from './components/Overview'; 
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addexpense" element={<AddExpense />} />
          <Route path="/reports" element={<Reports />} />
          {/* <Route path="/settings" element={<Settings />} />
          <Route path="/overview" element={<Overview />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;