const express = require('express');
const jwt = require('jsonwebtoken');
const Expense = require('../models/Expense');
const router = express.Router();

// kiểm tra xem người dùng đã đăng nhập hay chưa
const auth = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

//lấy danh sách giao dịch
router.get('/', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Thêm giao dịch
router.post('/', auth, async (req, res) => {
  const { description, amount, category } = req.body;
  try {
    const expense = new Expense({
      user: req.user.id,
      description,
      amount,
      category,
    });
    await expense.save();
    res.json(expense);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;