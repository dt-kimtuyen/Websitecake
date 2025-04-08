// routes/roleRoutes.js
const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

// Các route cho Role
router.post('/roles', roleController.createRole);         // Tạo mới role
router.get('/roles', roleController.getAllRoles);        // Lấy tất cả roles
router.get('/roles/:id', roleController.getRoleById);    // Lấy role theo ID
router.put('/roles/:id', roleController.updateRole);     // Cập nhật role theo ID
router.delete('/roles/:id', roleController.deleteRole);  // Xóa role theo ID

module.exports = router;
