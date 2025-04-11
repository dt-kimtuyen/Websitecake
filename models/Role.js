// models/Role.js
const mongoose = require('mongoose');

// Định nghĩa RoleSchema
const RoleSchema = new mongoose.Schema({
    name: { 
        type: String, 
        unique: true,  // Tên vai trò phải là duy nhất
        required: true 
    },
    description: { 
        type: String 
    }
}, { timestamps: true });  // Tự động thêm createdAt và updatedAt

// Xuất mô hình Role
module.exports = mongoose.model('Role', RoleSchema);
