const express = require('express');
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Income = require('../models/Income');
const Expense = require('../models/Expense');
const router = express.Router();

// Middleware to verify JWT token
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret'); // Replace with your JWT secret
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// đăng ký người dùng
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ email, password });
    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(password, salt);
    
    await user.save();
    
    const payload = { user: { id: user.id } };
    res.json({ 
      msg: "Registration successful",
    });
    // const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    // res.json({ 
    //   token
    // });

    
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// đăng nhập
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    if (password !== user.password) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'your_jwt_secret', {
      expiresIn: '1h',
    });

    res.json({ 
      token, 
      msg: 'Login successful' 
    });

  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

router.post('/incomeData', auth, async (req, res) => {
  try {
    // Lấy tất cả dữ liệu thu nhập của người dùng đã xác thực
    const incomes = await Income.find({ user: req.user.id });
    res.json({
      incomes,
      msg: 'All income data fetched successfully',
    });
  } catch (err) {
    console.error('Error fetching income data:', err.message);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

router.post('/expensesData', auth, async (req, res) => {
  try {
    // Lấy tất cả dữ liệu thu nhập của người dùng đã xác thực
    const expenses = await Expense.find({ user: req.user.id });
    res.json({
      expenses,
      msg: 'All income data fetched successfully',
    });
  } catch (err) {
console.error('Error fetching income data:', err.message);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

router.post('/reportData', auth, async (req, res) => {
  try {
    
    // Lấy tất cả dữ liệu thu nhập của người dùng đã xác thực
    const { month, year } = req.query; // Lấy tháng và năm từ query parameters
    const startDate = new Date(year, month - 1, 1); // Ngày đầu tháng
    const endDate = new Date(year, month, 0); // Ngày cuối tháng

    const incomes = await Income.find({
      user: req.user.id,
      date: { $gte: startDate, $lte: endDate },
    });
    const expenses = await Expense.find({
      user: req.user.id,
      date: { $gte: startDate, $lte: endDate },
    });
    
    res.json({
      expenses,
      incomes,
      msg: 'income,expense data this mounth fetched successfully',
    });
  } catch (err) {
    console.error('Error fetching income data:', err.message);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

router.put('/income/:id', auth, async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);
    if (!income) return res.status(404).json({ msg: 'Income not found' });

    // Kiểm tra quyền sở hữu
    if (income.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    income.value = req.body.value || income.value; // Cập nhật giá trị mới nếu có
    income.date = req.body.date || income.date; // Cập nhật ngày nếu có
    await income.save();

    res.json({ msg: 'Income updated', income });
  } catch (err) {
    console.error('Error updating income:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});
router.delete('/income/:id', auth, async (req, res) => {
  try {
    
    const income = await Income.findById(req.params.id);
    
    if (!income) return res.status(404).json({ msg: 'Income not found' });

    if (income.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    console.log(1);
    await income.deleteOne();
    
    res.json({ msg: 'Income removed' });
  } catch (err) {
    console.error('Error deleting income:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});


router.put('/expense/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ msg: 'Expense not found' });

    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    expense.value = req.body.value || expense.value;
    expense.date = req.body.date || expense.date;
    await expense.save();

    res.json({ msg: 'Expense updated', expense });
  } catch (err) {
    console.error('Error updating expense:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.delete('/expense/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ msg: 'Expense not found' });

    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await expense.deleteOne();
    res.json({ msg: 'Expense removed' });
  } catch (err) {
    console.error('Error deleting expense:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});
module.exports = router;