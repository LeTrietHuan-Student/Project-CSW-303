const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expenses');
require('dotenv').config();

const app = express();

// phân quyền
app.use(cors());
app.use(express.json());

// đường dẫn chroute
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

//kết nối MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));