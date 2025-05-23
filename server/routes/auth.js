const express = require('express');
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

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
    res.json({ 
      msg: "Login successful",
    });
    // const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    // res.json({ token });

  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;