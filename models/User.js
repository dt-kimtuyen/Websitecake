// models/User.js
const mongoose = require('mongoose');

// Định nghĩa UserSchema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,  // Tham chiếu tới Role
        ref: 'Role',  // Trỏ đến mô hình Role
        required: true
    }
});

// Xuất mô hình User
module.exports = mongoose.model('User', UserSchema);
