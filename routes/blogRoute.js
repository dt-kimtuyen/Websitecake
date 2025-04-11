// blogRoute.js
const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { verifyToken, isAdmin } = require('../middlewares/authorization');  // Import verifyToken và isAdmin từ authorization.js

// Các route cho Blog với phân quyền Admin
router.get('/', blogController.getAllBlogs);  // Dành cho cả Admin và User
router.post('/', verifyToken, isAdmin, blogController.createBlog);  // Chỉ Admin mới có quyền tạo
router.put('/:id', verifyToken, isAdmin, blogController.updateBlog); // Chỉ Admin mới có quyền sửa
router.delete('/:id', verifyToken, isAdmin, blogController.deleteBlog); // Chỉ Admin mới có quyền xóa

module.exports = router;  // Xuất router để sử dụng trong file app.js hoặc các route khác
