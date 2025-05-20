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

const PORT = 500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//kết nối MongoDB
const uri = 'mongodb+srv://lydat1502:Sl1zKNewxv2W8nOI@project303.k4sjmvk.mongodb.net/Project303';

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err.message));



// app.get('/',async(req, res) => {
//   try {
//     await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//     res.send('Connected to MongoDB successfully!');
//   } catch (err) {
//     console.error('Failed to connect to MongoDB:', err.message);
//     res.status(500).send('Error connecting to MongoDB.');
//   }
// })


// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.log(err));


