const mongoose = require('mongoose'); // mongoose schema cho dữ liệu người dùng

// định nghĩa schema  người dùng
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true, // yêu cầu mk
  },
});

module.exports = mongoose.model('User', UserSchema);  // xuất khẩu này đi,