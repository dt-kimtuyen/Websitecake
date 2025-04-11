// orderRoute.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { verifyToken, isAdmin } = require('../middlewares/authorization');  // Import verifyToken từ authorization.js

// Các route cho Order với phân quyền Admin
router.get('/', orderController.getAllOrders);  // Dành cho cả Admin và User
router.post('/', verifyToken, isAdmin, orderController.createOrder);  // Chỉ Admin mới có quyền tạo
router.put('/:id', verifyToken, isAdmin, orderController.updateOrder); // Chỉ Admin mới có quyền sửa
router.delete('/:id', verifyToken, isAdmin, orderController.deleteOrder); // Chỉ Admin mới có quyền xóa

module.exports = router;
