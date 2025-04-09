// feedbackRoute.js
const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const { verifyToken, isAdmin } = require('../middlewares/authorization');  // Import middleware verifyToken từ authorization.js

// Các route cho Feedback với phân quyền Admin
router.get('/', feedbackController.getAllFeedback);  // Dành cho cả Admin và User
router.post('/', verifyToken, feedbackController.createFeedback);  // Chỉ Admin mới có quyền tạo
router.put('/:id', verifyToken, feedbackController.updateFeedback); // Chỉ Admin mới có quyền sửa
router.delete('/:id', verifyToken, feedbackController.deleteFeedback); // Chỉ Admin mới có quyền xóa

module.exports = router;  // Xuất router để sử dụng trong file app.js hoặc các route khác
