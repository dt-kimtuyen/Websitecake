// warehouseRoute.js
const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouseController');
const { verifyToken, isAdmin } = require('../middlewares/authorization');  // Import verifyToken và isAdmin từ authorization.js

// Các route cho Warehouse với phân quyền Admin
router.get('/', warehouseController.getAllWarehouses);  // Dành cho cả Admin và User
router.post('/', verifyToken, isAdmin, warehouseController.createWarehouse);  // Chỉ Admin mới có quyền tạo
router.put('/:id', verifyToken, isAdmin, warehouseController.updateWarehouse); // Chỉ Admin mới có quyền sửa
router.delete('/:id', verifyToken, isAdmin, warehouseController.deleteWarehouse); // Chỉ Admin mới có quyền xóa

module.exports = router;  // Xuất router để sử dụng trong file app.js hoặc các route khác
